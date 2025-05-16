import { InstanceOptions, Modal, ModalOptions } from "flowbite";

export default function closeModal(...args) {
    const options: ModalOptions = {
        placement: 'center',
        closable: true,
        backdropClasses: 'bg-blask/30 dark:bg-black/50 fixed inset-0 z-40',
    };

    for (const id of args) {
        const instanceOptions: InstanceOptions = {
            id,
            override: true,
        };
        const el = document.getElementById(id);
        const modal = new Modal(el, options, instanceOptions);
        modal.hide();
        document.querySelector('div[modal-backdrop')?.remove();
    }
}