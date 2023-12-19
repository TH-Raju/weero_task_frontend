/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    data.image = data.image[0].name
    data.price = parseInt(data.price)
    data.discountPrice = parseInt(data.discountPrice)
    console.log(data);
    const url =
      "http://localhost:5000/api/v1/task/create";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result.success) {
          reset();
          toast.success("Successfully Added");
          navigate("/");
        } else {
          toast.error("Something Wrong!");
        }
      });
  };


  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-center text-3xl font-bold mb-5">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Categoriy Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter category Name"
              {...register("category", {
                required: "category is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Sub Category Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Sub Categoriy Name"
              {...register("subCategoriy", {
                required: "subCategoriy is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Price <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Product Price"
              {...register("price", {
                required: "price is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Discount Price <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              placeholder="Enter Discount Amount"
              {...register("discountPrice", {
                required: "discountPrice is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Image <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "image is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <input type="submit" className="btn btn-success my-4 px-10" />
      </form>
    </div>
  );
};

export default AddProduct;
