import { useState } from "react";
import { MediaView } from "./MediaView";
import { MediaContent } from "./MediaContent";

export const Preview = ({ setToggle, media, video_url }) => {
  // const [media, setMedia] = useState("");
  const [complete, setComplete] = useState(true);
  return (
    <div className="fx-lt fxwrap db-sm lecture-editor--edit-content__row--3z9s2">
        {complete ? <MediaView video_url={video_url} media={media} setToggle={setToggle}/> : <MediaContent media={media} setToggle={setToggle}/>}
    </div>
  );
};
