/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditModal = ({ id, task, refetch }) => {
  // console.log("tak", task);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    data.image = data.image[0]?.name;
    if (data.image === undefined) {
      data.image = data.preimage;
    }
    data.price = parseInt(data.price);
    data.discountPrice = parseInt(data.discountPrice);
    // console.log(data);
    // console.log(id);
    fetch(
      `http://localhost:5000/api/v1/task/update/${data?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          document.getElementById(id).close();
          toast.success("update successful");
        }
        navigate(`/`);
        reset();
        refetch();
      });
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle text-black">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-black">Update your Task</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="mx-auto mb-0 mt-3 max-w-md space-y-4"
        >
          <div className="form-control w-full max-w-xs hidden">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Categoriy Id</span>
            </label>
            <input
              type="text"
              defaultValue={task._id}
              {...register("id")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Categoriy Name</span>
            </label>
            <input
              type="text"
              defaultValue={task.category}
              {...register("category")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Sub Category Name</span>
            </label>
            <input
              type="text"
              defaultValue={task.subCategoriy}
              {...register("subCategoriy")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Price</span>
            </label>
            <input
              type="text"
              defaultValue={task.price}
              {...register("price")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Discount Price</span>
            </label>
            <input
              type="number"
              defaultValue={task.discountPrice}
              {...register("discountPrice")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Previous Image</span>
            </label>
            <img src={task.image} alt={task.image} className="h-14 w-24" />
            <input
              type="text"
              value={task.image}
              {...register("preimage")}
              className="input hidden input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Image</span>
            </label>
            <input
              type="file"
              {...register("image")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex items-baseline justify-end gap-4">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150"
            >
              Update
            </button>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-warning">Close</button>
              </form>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditModal;
