import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import EllipsisMenu from "./EllipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import { deleteBoard, setBoardActive } from "../redux/boardsSlice";

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isEllipsis, setIsEllipsisOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsEllipsisOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteBoard())
    dispatch(setBoardActive({ index: 0 }))
    setIsDeleteModalOpen(false)
  };

  const onDropdownClick = () => {
    setOpenDropdown(state => !state)
    setIsEllipsisOpen(false)
    setBoardType('add')
  }
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side  */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl ">
            Kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 cursor-pointer md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="hidden md:block button">+ Add New Task</button>
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>
          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsEllipsisOpen((state) => !state);
            }}
            src={ellipsis}
            alt="ellipsis"
            className="cursor-pointer h-6"
          />
          {isEllipsis && (
            <EllipsisMenu
              type="Board"
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
            />
          )}
        </div>
      </header>
      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          setBoardModalOpen={setBoardModalOpen}
          type={boardType}
        />
      )}
      {openAddEditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board.name}
          type="board"
        />
      )}
    </div>
  );
};

export default Header;
