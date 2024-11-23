import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';

function Navbar({ onMenuClick }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="text-2xl font-bold text-orange-500 ml-12 text-center">
              CarePaws NGO
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BellIcon className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/85ae5d63-0227-467e-8410-48d0295deda3/dgditqz-ba17bf12-4460-45cd-8957-5f499bca2789.jpg/v1/fill/w_894,h_894,q_70,strp/___ai_art____this_page_is_for_character_inspo_by_lordkai17_dgditqz-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzg1YWU1ZDYzLTAyMjctNDY3ZS04NDEwLTQ4ZDAyOTVkZWRhM1wvZGdkaXRxei1iYTE3YmYxMi00NDYwLTQ1Y2QtODk1Ny01ZjQ5OWJjYTI3ODkuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.R7oTFwShDtqptQ-A5ur6uyvnDM1umaoL9uuKuUKyu9o"
                alt="Profile"
              />
              <span className="hidden md:block text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;