import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/auth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/auth";

const Header = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Türkiye İl İstatistikleri
      </h1>
      <div className="flex items-center">
        <span className="mr-4 hidden sm:inline">
          Hoş geldiniz, {user.username}
        </span>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium flex items-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <FiLogOut className="h-4 w-4 mr-2" />
          Çıkış Yap
        </button>
      </div>
    </header>
  );
};

export default Header;
