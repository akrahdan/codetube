import { useState } from "react";
import { DeleteDialog } from "portal/scenes/Dialog/DeleteDialog";
import { Modal } from "portal/scenes/Modal";
export const DownloadItem = ({ media, deleteDownload }) => {
    const [toggleDelete, setToggleDelete] = useState(false)
    return (
        <div key={media.id} className="fx-lc">
            <div className="fx ellipsis pt10 pb10">
                <span className="mr5">
                    <span className="cfi cfi-download" />
                </span>
                {media.name}
            </div>
            <div>
                <button
                    onClick={() => setToggleDelete(!toggleDelete)}
                    type="button"
                    className="item-icon-button--icon-button--1IKG6 item-icon-button--icon-button--always-show--1mM0X btn btn-xs btn-quintinary"
                >
                    <span className="cfi cfi-trash-o" />
                    <span className="sr-only">Delete</span>
                </button>
            </div>
            {toggleDelete && <Modal>
                <DeleteDialog
                    text={'Are you sure you want to delete the associated curriculum resource? Continue if you want to'}
                    cancelDelete={() => setToggleDelete(!toggleDelete)}
                    deleteCallback={() => {
                        deleteDownload(media)
                        setToggleDelete(!toggleDelete)
                    }
                    }
                />
            </Modal>}
        </div>
    );
}