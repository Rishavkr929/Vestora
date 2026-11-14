import api from "../../utils/api";

// Helpers for calling the ML routes on a free host that goes to sleep.
// A 502, 503 or 504 usually means the ML server is asleep or restarting,
// so the request is retried a few times before an error is shown.

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const errorMessage = (err) =>
  err.response?.data?.error || err.response?.data?.message || err.message || "";

// The backend passes the ML server's status along inside its error text,
// so check both the real status and the text.
export const isServerWaking = (err) =>
  [502, 503, 504].includes(err.response?.status) ||
  /status code 50[234]/.test(errorMessage(err));

export async function mlRequest(
  config,
  onStatus = () => {},
  attempts = 4,
  waitMs = 20000
) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await api.request(config);
    } catch (err) {
      if (!isServerWaking(err) || attempt >= attempts) throw err;
      onStatus(
        `The ML server is waking up. Trying again (attempt ${attempt + 1} of ${attempts})...`
      );
      await sleep(waitMs);
    }
  }
}

// A readable message for the page, instead of "status code 502"
export const mlErrorText = (err) => {
  const msg = errorMessage(err);
  if (isServerWaking(err)) {
    return "The ML server is not responding. It may be asleep or restarting. Wait a minute and try again.";
  }
  if (err.code === "ECONNABORTED" || /timeout/i.test(msg)) {
    return "The ML server took too long to answer. Try again in a minute.";
  }
  return msg || "Something went wrong.";
};
