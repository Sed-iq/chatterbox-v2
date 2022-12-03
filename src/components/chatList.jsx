function ChatList({ links }) {
  return (
    <div id="chat-list">
      {/* Header */}
      <div id="chat-list-header" className=" text-base pb-2 px-2 neon">
        Chats
      </div>
      <div id="chat-list">
        {links.map((item, index) => {
          return (
            <div key={index} className="chat-list-item mx-3">
              <div className="chat-color-icon pi pi-circle-fill text-4xl w-full text-center"></div>
              <p className="uruoob text-2xl ">{item}</p>
            </div>
          );
        })}
      </div>
      <div id="recent-chats" className="my-4">
        <p className=" text-base my-2 font-bold">Recent Chats</p>
        {links.map((item, index) => {
          return (
            <div
              id="hori-chat-list"
              key={index}
              onClick={() => {}}
              className=" my-3 flex hover:bg-gray-500 p-2 rounded flex-row justify-start"
            >
              <span className="pi pi-circle-fill text-4xl"></span>
              <div className=" flex flex-col mx-2 px-2 justify-between">
                <h5 className=" text-sm font-extrabold">{item}</h5>
                <p className=" text-xs font-light">Hey babe...</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ChatList;
