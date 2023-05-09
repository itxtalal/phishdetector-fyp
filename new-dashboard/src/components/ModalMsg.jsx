import XMark from "/src/images/icon/xmark-solid.svg";

const ModalMsg = ({ setIsOpen, message }) => {
  return (
    <div
      className="absolute top-0 left-0  z-40 h-screen w-screen bg-black/[0.2]"
      onClick={() => setIsOpen(false)}
    >
      <div className="absolute relative top-1/2 left-1/2 z-50 flex h-auto w-fit -translate-x-1/2 -translate-y-1/2 flex-col rounded bg-white px-5 py-3">
        <img
          src={XMark}
          width={11}
          className="absolute right-5 cursor-pointer"
          onClick={setIsOpen.bind(null, false)}
        />
        <span className="py-8">{message}</span>
      </div>
    </div>
  );
};

export default ModalMsg;
