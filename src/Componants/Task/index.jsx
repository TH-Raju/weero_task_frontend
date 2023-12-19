/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import {  useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmModal from "../../Shared/ConfirmModal";
import EditModal from "../EditModal";

const Task = () => {
  const [deleteUser, setDeleteUser] = useState(null);
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/task");
      const data = await res.json();
      return data.data;
    },
  });

  refetch();
    // console.log(tasks);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const closeModal = () => {
    setDeleteUser(null);
  };
  const handleDeleteUser = (task) => {
    fetch(
      `http://localhost:5000/api/v1/task/${task._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Task Deleted successfully");
          refetch();
        }
      });
  };


  // console.log(tasks);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* slice(start, end) */}
        {tasks?.length > 0 ? (
          tasks?.map((task) => (
            <div key={task._id}>
              <div className="border border-sky-400">
                <div className="flex items-center relative">
                  <img src={task.image} alt={task.image} className="h-28" />
                  <div className="absolute right-0 top-0">
                    <div className="border border-blue-700 rounded-lg">
                      <div className="dropdown ">
                        <label tabIndex={0} className="btn m-1 btn-xs">
                          option
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                        >
                          <li>
                            <button
                              className="btn btn-primary btn-sm"
                              // onClick={() => handleMakeUser(task._id)}
                              onClick={() =>
                                document.getElementById(task._id).showModal()
                              }
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <label
                              onClick={() => setDeleteUser(task)}
                              htmlFor="confirmation-modal"
                              className="btn bg-red-600 mt-1 hover:bg-red-900 text-white  btn-sm "
                            >
                              Delete
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1>
                    Categoriy :{" "}
                    <span className="font-bold">{task.category}</span>
                  </h1>
                  <h1>
                    Sub-Category : <span>{task.subCategoriy}</span>
                  </h1>
                  <h1>
                    Original Price :{" "}
                    <span className="font-bold">{task.price}</span>
                  </h1>
                  <h1>
                    Discount Price : <span>{task.discountPrice}</span>
                  </h1>
                </div>
              </div>
              <EditModal id={task._id} task={task} refetch={refetch} />
            </div>
          ))
        ) : (
          <>
            <h1 className="text-center font-semibold">
              No Product are available !!!!
            </h1>
          </>
        )}
      </div>
      {deleteUser && (
        <ConfirmModal
          title={`Are You sure you want to delete?`}
          message={`If You delete ${deleteUser.category}. It cannot be undone.`}
          closeModal={closeModal}
          successButtonName="Delete"
          successAction={handleDeleteUser}
          modalData={deleteUser}
        ></ConfirmModal>
      )}
    </div>
  );
};

export default Task;
