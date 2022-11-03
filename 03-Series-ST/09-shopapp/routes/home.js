import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
   res.send(`
      <h2 style="
         font-family:system-ui;
         background:royalblue;
         color:#fff;
         text-align:center;
         padding:10px 0;
         border-radius:3px;
      ">
         Api Home Page
      </h2>
   `);
});

export default router;
