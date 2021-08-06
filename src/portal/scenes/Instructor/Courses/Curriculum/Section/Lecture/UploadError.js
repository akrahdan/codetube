export const UploadError = ({ error}) => {
  return (
    <tr className="asset-table--open--2Zngk asset-table--asset-row--36BEz-extra">
      <td colspan="5" className="asset-table--error-container--1MQqv">
        <b>Your video upload failed for a reason:</b>
        <ul className="bulleted-list">
          <li>
            <span>
              {error}
            </span>
          </li>
        </ul>
      </td>
    </tr>
  );
};
