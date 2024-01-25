import { Router } from "express";
import { sample_shoes, sample_tags, sample_users } from "../data";
import asynceHandler from "express-async-handler";
import { ShoeModel } from "../models/shoe.model";

const router = Router();



router.get(
  "/Craze",
  asynceHandler(async (req, resp) => {
    const shoeCount = await ShoeModel.countDocuments();
    if (shoeCount > 0) {
      resp.send("Data Already Inserted!");
      return;
    }
    await ShoeModel.create(sample_shoes);
    resp.send(sample_shoes);
  })
);
router.get(
  "/",
  asynceHandler(async (req, resp) => {
    const shoes = await ShoeModel.find();
    resp.send(shoes);
  })
);

router.get(
  "/search/:searchItem",
  asynceHandler(async (req, resp) => {
    const searchRegex = new RegExp(req.params.searchItem, "i");
    const shoes = await ShoeModel.find({ name: { $regex: searchRegex } });
    resp.send(shoes);
  })
);

router.get("/tags", asynceHandler(async (req, resp) => {
 const tags = await ShoeModel.aggregate([
  {
  $unwind:'$tags'
 },
 {
  $group:{
    _id:'$tags',
    count:{$sum: 1}

  }
   },
   {
    $project:{
      _id:0,
      name:'$_id',
      count:'$count'

    }
   }
]).sort({count:-1});  

const all = {
  name:'All',
  count:await ShoeModel.countDocuments()

}

  tags.unshift(all);
  resp.send(tags);
}));


router.get("/tag/:tagname", asynceHandler(async (req, resp) => {
  const shoes = await ShoeModel.find({tags:req.params.tagname});
  resp.send(shoes);
}));



router.get("/:id", (req, resp) => {
  const id = req.params.id;
  const shoes = sample_shoes.find((shoe) => shoe.id == id)!;
  resp.send(shoes);
});

export default router;
