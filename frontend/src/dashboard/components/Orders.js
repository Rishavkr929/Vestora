// import React, { useState, useEffect, useContext } from "react";
// import api from "../../utils/api";
// import GeneralContext from "./GeneralContext";

// const Orders = () => {
//   const [allOrders, setAllOrders] = useState([]);
//   const { refreshTrigger } = useContext(GeneralContext);

//   useEffect(() => {
//     api
//       .get("/allOrders")
//       .then((res) => setAllOrders(res.data))
//       .catch((err) => console.error("Error fetching orders:", err));
//   }, [refreshTrigger]);

//   return (
//     <>
//       <h3 className="title">Orders ({allOrders.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Price</th>
//             <th>Mode</th>
//           </tr>

//           {allOrders.map((order, index) => {
//             return (
//               <tr key={index}>
//                 <td>{order.name}</td>
//                 <td>{order.qty}</td>
//                 <td>{order.price.toFixed(2)}</td>
//                 <td className={order.mode === "BUY" ? "profit" : "loss"}>
//                   {order.mode}
//                 </td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Orders;



import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { refreshTrigger } = useContext(GeneralContext);

  const green = "#174D3C";
  const red = "#501A1A";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await api.get("/allOrders");
        setAllOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [refreshTrigger]);

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        color: green,
        fontFamily: "inherit",
      }}
    >
      {/* PAGE HEADING */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(32px, 4vw, 46px)",
            fontWeight: "400",
            color: green,
            marginBottom: "8px",
          }}
        >
          Orders ({allOrders.length})
        </h1>

        <p
          style={{
            color: green,
            fontSize: "16px",
            margin: 0,
          }}
        >
          Every buy and sell you have placed.
        </p>
      </div>

      {/* ORDERS TABLE */}
      <div
        className="table-responsive"
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <table
          className="table align-middle mb-0"
          style={{
            width: "100%",
            minWidth: "550px",
            color: green,
            borderCollapse: "collapse",
            backgroundColor: "transparent",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: `2px solid ${green}`,
                color: green,
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <th
                style={{
                  padding: "16px 22px",
                  width: "40%",
                  color: green,
                }}
              >
                Instrument
              </th>

              <th
                className="text-center"
                style={{
                  padding: "16px 12px",
                  color: green,
                }}
              >
                Qty.
              </th>

              <th
                className="text-end"
                style={{
                  padding: "16px 22px",
                  color: green,
                }}
              >
                Price
              </th>

              <th
                style={{
                  padding: "16px 22px",
                  color: green,
                }}
              >
                Mode
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center"
                  style={{
                    padding: "35px",
                    color: green,
                  }}
                >
                  Loading orders...
                </td>
              </tr>
            ) : allOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center"
                  style={{
                    padding: "35px",
                    color: green,
                    fontSize: "15px",
                  }}
                >
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              allOrders.map((order) => (
                <tr
                  key={order._id}
                  style={{
                    borderBottom: "2px solid #D0D0D0",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  <td
                    style={{
                      padding: "19px 22px",
                      color: green,
                    }}
                  >
                    {order.name}
                  </td>

                  <td
                    className="text-center"
                    style={{
                      padding: "19px 12px",
                      color: green,
                    }}
                  >
                    {order.qty}
                  </td>

                  <td
                    className="text-end"
                    style={{
                      padding: "19px 22px",
                      color: green,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatPrice(order.price)}
                  </td>

                  <td
                    style={{
                      padding: "19px 22px",
                      fontWeight: "700",
                      color: order.mode === "BUY" ? green : red,
                    }}
                  >
                    {order.mode}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
