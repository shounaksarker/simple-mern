import dbConnect from "../../../utils/db";
import Note from "../../../utils/model/Note";
dbConnect();

const id = async (req, res) => {
  /**========================================================================
   *?                            Single User
   *========================================================================**/

   if (req.method === "GET") {
    try {
      const id = req.query.id;

      const result = await Note.findOne({ _id: id });
      if (result) {
        res.status(200).send({ success: true, data: result });
      } else {
        res
          .status(404)
          .send({ success: false, message: "Error occurred while updating" });
      }
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }
  /**========================================================================
   *?                            Update User
   *========================================================================**/

  if (req.method === ("PUT" || "PATCH")) {
    try {
      const id = req.query.id;

      const result = await Note.updateOne({ _id: id }, { $set: req.body });
      if (result) {
        res.status(200).send({ success: true, data: result });
      } else {
        res
          .status(404)
          .send({ success: false, message: "Error occurred while updating" });
      }
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  } else if (req.method === "DELETE") {
  /**========================================================================
   *!                           Delete USer
   *========================================================================**/
    try {
      const id = req.query.id;

      const result = await Note.deleteOne({ _id: id });

      if (result) {
        res
          .status(200)
          .send({
            success: true,
            message: "User has deleted successfully",
            data: result,
          });
      } else {
        res
          .status(404)
          .send({ success: false, message: "Error occurred while Deleting" });
      }
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }
};

export default id;
