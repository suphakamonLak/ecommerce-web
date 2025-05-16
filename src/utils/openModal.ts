import { InstanceOptions, Modal } from "flowbite"
import { ModalOptions } from "flowbite";

export default function openModal({ modalId, options={}, beforeOpen = () => {}, afterOpen = () => {} }) {
    if(typeof beforeOpen === 'function') {
        beforeOpen();
    }

    const modalOptions: ModalOptions = {
        placement: "center",
        closable: false,
        backdropClasses: "dark:bg-black/50",
        ...options,
    }

    const instanceOptions: InstanceOptions = {
        id: modalId,
        override: true,
    }

    const el = document.getElementById(modalId);
    // Check (ป้องกันกรณีเป็น null มันจะruntime error)
    if(!el) {
        console.warn(`Modal element with id '${modalId}' not found`);
        return;
    }
    // el.classList.remove('hidden')
    // el.classList.add('flex')

    const modal = new Modal(el, modalOptions, instanceOptions);
    modal.show();

    if(typeof afterOpen === 'function') {
        afterOpen();
    }

//   modal.removeInstance();
}

