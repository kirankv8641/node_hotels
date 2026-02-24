 const express = require('express');
  const router=express.Router();

  const MenuItem = require('../models/MenuItem');

  router.post('/', async (req, res) => {
    try {
      const data = req.body
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  //Get method to get the Menu Items
  router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  //Update
  router.put('/:id', async(req,res)=>{
    try{
      const menuId=req.params.id;
      const updatedMenu=req.body;

      const response= await MenuItem.findByIdAndUpdate(menuId,updatedMenu,{
         returnDocument: 'after',
            runValidators: true,
      })
      if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        console.log('Menu uploaded');
        res.status(200).json(response);
    }catch(err){
console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  //Delete

router.delete('/:id', async(req,res)=>{
    try{
      const menuId=req.params.id;
     
      const response= await MenuItem.findByIdAndDelete(menuId)
      if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        console.log('Menu deleted');
        res.status(200).json(response);
    }catch(err){
console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
//Comments added for testing

  module.exports=router;