export default () => {
  return (
    <div id="footer-cover">
      <footer
        id="footer"
        className=" uruoob sm:text-xl text-sm text-center neon sm:px-7 p-5 py-3 "
      >
        Copyright &copy; Developers-creed {date()}
      </footer>
    </div>
  );
};
function date() {
  let d = new Date().getFullYear();
  return d;
}
