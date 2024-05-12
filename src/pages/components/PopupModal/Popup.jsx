import { X } from "lucide-react";
import { useRef } from "react";

export default function Popup(props) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="z-[900] fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center select-none h-auto"
    >
      <div className="mt-10 flex flex-col gap-5 text-white mobile:mx-6 h-auto">
        {props.xButton && (
          <button onClick={props.onClose} className="place-self-end">
            <X size={30} />
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
}
