exports = async function(req){
  
  // ========== DEFINE CONTEXT ========== //
  
  const mongodb = context.services.get("mongodb-atlas");
  const vehicleExample = mongodb.db("JLR").collection("VehicleExample");
  
  const args = req.query.arg;
  console.log(args)

  
  // ========== SEARCH DOCUMENT ========== //
  
  // Define pipeline
  // [ ] TODO: Pass arg to search to parameterize
  const pipeline = [
    {
      $search: {
        index: "SearchWithAI",
        text: {
          query: args,
          path: {
            wildcard: "*"
          }
        }
      }
    }
  ]
  
  // TODO
  
  const vehicleSearch = await vehicleExample.aggregate(pipeline);
  // Verify update in logs
  console.log(vehicleSearch);

  return { result: vehicleSearch };
};