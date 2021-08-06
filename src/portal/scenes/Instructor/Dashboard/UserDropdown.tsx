import type { InstructorResponse } from "services/courses";
import { LogoutResponse, useLogoutMutation} from 'services/auth';
import cookie from 'react-cookies';
import { useHistory } from 'react-router-dom'
type DropdownProps = {
  profile: InstructorResponse
}
export const UserDropdown: React.FC<DropdownProps> = ({ profile }) => {

  const { push } = useHistory()
  const [ logout ] = useLogoutMutation()
  if (!profile) {
    return null;
  }

  const initialAvatar = (profile: InstructorResponse) => {
    const firstName = profile.first_name;
    const lastName = profile.last_name;
    if(firstName && firstName !== "") {
      return firstName.substr(0,2)
    }
    if(lastName && lastName !== "") {
      return lastName.substr(0,2)
    }
    const user = profile.user;
    if (user.email && user.email !== "") {
      return user.email.substr(0,2)
    }
  }

  return (
    <ul
      role="menu"
      className="dropdown-menu dropdown-menu-right"
      aria-labelledby="header.profile"
    >
      <li role="presentation" className="menu__link">
        <a
          aria-label="Edit your profile"
          data-purpose="edit-profile"
          href="/instructor/user/edit-profile/"
          rel=" noopener noreferrer"
          target="_self"

          role="menuitem"
        >
          {profile.avatar ? (<img alt="" className="user-avatar user-avatar--image" height={48} src={profile.avatar} width={48} />
          ) : (<div
            role="img"
            aria-label={profile && profile.email}
            className="user-avatar user-avatar--initials"
            style={{
              backgroundColor: "rgb(28, 29, 31)",
              fontSize: "15px",
              width: "48px",
            }}
          >
            <div className="user-avatar__inner fx-c">
              <span className="user-initials">{initialAvatar(profile)}</span>
            </div>
          </div>)}
          <span className="fx ml-space-xs">
            <span className="text-midnight ellipsis">{profile.first_name ? `${profile.first_name} ${profile.last_name}` : profile.email ? profile.email : profile.user.email}</span>
            <span className="a11 text-midnight-lighter ellipsis">
              {profile.email ? profile.email : profile.user ? profile.user.email : ''}
            </span>
          </span>
        </a>
      </li>
      <li role="presentation" className="menu__link hidden-lg hidden-xl">
        <a
          href="/instructor/courses"
          rel=" noopener noreferrer"
          target="_self"

          role="menuitem"
        >
          <span>My notifications</span>
        </a>
      </li>
      <li role="presentation" className="menu__link">
        <a
          href="/profiles/me"
          rel="nofollow noreferrer noopener noopener noreferrer"
          target="_blank"

          role="menuitem"
        >
          Public profile
        </a>
      </li>

      <li role="presentation" className="menu__link">
        <a
          href="/instructor/user/edit-info"
          rel=" noopener noreferrer"
          target="_self"

          role="menuitem"
        >
          Payout settings
        </a>
      </li>
      <li role="separator" className="divider" />
      <li role="presentation" className="menu__link">
        <a
          data-purpose="do-logout"
          onClick = {event => {
            event.preventDefault()
            const obj = {
              csrfmiddlewaretoken: cookie.load('csrftoken')
            }
            logout().then((res: { data: LogoutResponse}) => {
              if(res.data.detail) {
                localStorage.clear()
                push('/')
              }
              
            })
          }}

          rel=" noopener noreferrer"
          target="_self"

          role="menuitem"
        >
          Log out
        </a>
      </li>
      <li role="separator" className="divider--account-ads divider" />
      <li role="presentation" className="menu__link account-menu-ufb-ad">
        <a

          href="#"
          rel="noopener noopener"
          target="_blank"
          role="menuitem"
        >

        </a>
      </li>
    </ul>
  );
};
