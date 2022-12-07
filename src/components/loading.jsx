const Loading = ({ text, icon }) => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="">
          <i className={`pi ${icon} mr-3`}></i>
          <span className="sm:text-xl black_north">{text}</span>
        </div>
      </div>
    </>
  );
};
export default Loading;
