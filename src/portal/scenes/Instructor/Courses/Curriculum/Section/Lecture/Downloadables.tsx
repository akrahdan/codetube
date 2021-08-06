import { useAppSelector } from "store/hooks";
import { selectResources } from "state/course/courseSplice";
import type { MediaResponse } from "services/courses";

import { useState, useEffect } from "react";
import { DownloadItem } from "./DownloadItem";
export const Downloadables = ({ resources, deleteDownload }) => {
  const selectedResources = useAppSelector(selectResources)
  const [mediaResources, setMediaResouces] = useState<MediaResponse[]>([])

  useEffect(() => {
    if (resources) {
      const results = resources.map(id => {
        const appResources = selectedResources as MediaResponse[]
        const resource = appResources.find(item => item.id == id)
        if (resource) {
          return resource
        }

      })
      setMediaResouces(results)
    }
  }, [selectedResources, resources])

  if (!mediaResources || mediaResources.length == 0) return null
  return (
    <div className="a11 lecture-editor--edit-content__row--3z9s2">
      <div
        className="lecture-editor--edit-content__row--3z9s2"
        data-purpose="downloadable-files-section"
      >
        <h4>
          <div className="a11"></div>
        </h4>
        {mediaResources.map((media, index) => <DownloadItem key={index} media={media}
          deleteDownload={deleteDownload} />)}
      </div>

    </div>
  );
};
