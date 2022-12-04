const express = require("express");
const mongoose = require("mongoose");
const CustomerModel = require("./models/Customer");
require("dotenv/config");
const PORT = process.env.PORT || 9090;
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_CONNECT_URL, () =>
  console.log("connected to DB")
);

app.get("/gets", (req, res) => res.json(CustData.find()));

app.post("/newcust", async (req, res) => {
  const custName = req.body.custName;
  const custNumber = req.body.custNumber;
  const custEmail = req.body.custEmail;
  const custPhone = req.body.custPhone;
  const customer = new CustomerModel({
    name: custName,
    htno: custNumber,
    Email: custEmail,
    phone: custPhone,
  });
  try {
    await customer.save();
    res.send("Inserted Values");
  } catch (err) {
    console.log(err);
  }
});

app.get("/display", async (req, res) => {
  CustomerModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

app.put("/upname", async (req, res) => {
  const upname = req.body.upName;
  const id = req.body.id;

  try {
    await CustomerModel.findById(id, (err, upcustomer) => {
      upcustomer.name = upname;
      upcustomer.save();
      res.json(CustomerModel);
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/upemail", async (req, res) => {
  const upemail = req.body.upEmail;
  const id = req.body.id;

  try {
    await CustomerModel.findById(id, (err, upcustomer) => {
      upcustomer.Email = upemail;
      upcustomer.save();
      res.json(CustomerModel);
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/upphone", async (req, res) => {
  const upphone = req.body.upPhone;
  const id = req.body.id;

  try {
    await CustomerModel.findById(id, (err, upcustomer) => {
      upcustomer.phone = upphone;
      upcustomer.save();
      res.json(CustomerModel);
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delcust/:id", async (req, res) => {
  const id = req.params.id;
  await CustomerModel.findByIdAndRemove(id);
});

app.listen(PORT, () => console.log("Server Ready."));
