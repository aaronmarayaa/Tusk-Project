import { Paperclip } from 'lucide-react';

function MainContent() {
  return (
    <div className="flex items-center justify-center flex-grow p-4">
      <div className="bg-black rounded-lg shadow-sm p-8 w-full max-w-md border border-white/10 w-500">
        
        
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold text-white mb-4">
            What can I help you with?
          </h1> {/* Added a gap below the heading */}
          
          
          
          
          <div className="flex flex-col items-center justify-center w-100 h-50">
            
            
            <div className="flex items-center w-full">
                <div className="flex items-center bg-white/10 rounded-lg">
                    <textarea
                    placeholder="Enter your message here"
                    className=" w-full text-white focus:outline-none resize-none overflow-hidden no-scrollbar p-10 mr-5"
                    />
                    <label
                        htmlFor="file-upload" style={{ marginRight: '20px' }}
                        className="right-2 top-1/2 transform-translate-y-1/2 cursor-pointer flex flex-col items-center justify-center p-2 text-white hover:text-purple-500 transition mr-5"
                    >
                        <Paperclip className="w-5 h-5" />
                        <input type="file" id="file-upload" className="hidden" />
                    </label>
                </div>

                <button className="ml-6 bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded">
                    Send
                </button>
            </div>
          
          
          
          </div>


        
          </div>
      </div>
    </div>
  );
}
export default MainContent;