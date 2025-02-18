import gateway from "../config/getway.js";
import { Order } from './../models/orderSchema.Model.js';


export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, (error, response) => {
        if (error) {
          console.error("Error generating Braintree token:", error);
          res.status(500).send({ error: "Error generating Braintree token." });
        } else {
          res.json({ clientToken: response.clientToken });
        }
      });
    } catch (error) {
      console.error("Error generating Braintree token:", error);
      res.status(500).send({ error: "Internal server error." });
    }
  }; 
  
export const braintreePaymentController = async (req, res) => {
    try {
      const { cart, nonce, total } = req.body;
  
      if (!cart || !nonce || !total) {
        return res.status(400).send({ error: "Invalid request data." });
      }
  
      gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        async (error, result) => {
          if (error) {
            console.error("Braintree transaction error:", error);
            return res.status(500).send({ error: "Transaction failed." });
          }
  
          if (result?.success) {
            try {
              const order = await new Order({
                products: cart,
                payment: result,
                buyer: req.user._id,
              }).save();
  
              return res.json({ ok: true, order });
            } catch (saveError) {
              console.error("Error saving order:", saveError);
              return res.status(500).send({ error: "Error saving order." });
            }
          } else {
            console.error("Transaction error:", result?.message);
            return res
              .status(500)
              .send({ error: result?.message || "Transaction failed." });
          }
        }
      );
    } catch (error) {
      console.error("Error processing payment:", error);
      return res.status(500).send({ error: "Internal server error." });
    }
  };