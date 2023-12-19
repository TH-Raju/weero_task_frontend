/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ContextData } from "../../Context";
import Task from "../../Componants/Task";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { register, handleSubmit, reset } = useForm();

  const { theme } = useContext(ContextData);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    fetch(
      "https://task-manage-9e14yw343-th-raju.vercel.app/api/v1/task/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          // console.log(data);
          toast.success("Task Added Successfully.");
          document.getElementById("my_modal_5").close();
          navigate("/");
          reset();
        } else {
          toast.error("Can't added Task");
        }
      });
  };

  return (
    <div className="w-[70%] mx-auto">
      <div className="flex justify-between items-baseline">
        <h1 className=" my-10 text-3xl font-bold">Products</h1>
      </div>
      <Task />
    </div>
  );
};

export default Home;
