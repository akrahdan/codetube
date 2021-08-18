import { Logo } from 'portal/components/Logo'
export const Header = () => {
  return (
    <div className="cf-page__header">
      <nav className="container-fluid cf-py-1 d-flex align-items-center cf-background--color-medium">
        <a
          className="d-flex align-items-center _8z6CANbMCQQRjBR-HaB9s"
          href="/"
        >
          <Logo className="cf-icon--5" height="2em" width="60px" />
        </a>
        <div className="d-flex align-items-center align-self-stretch flex-fill">
          <a
            className="cf-text-h6 cf-pl-8 cf-py-2 _1uZ__lILVUMfuHBOTaFTvg"
            href="/"
          >
            Back Home
          </a>
          <a
            className="cf-text-h6 cf-pl-8 cf-py-2 _1uZ__lILVUMfuHBOTaFTvg _1khWnenKj6kop1liRNcRjI"
            href="/learn"
            aria-current="page"
          >
            Progress
          </a>
         
        </div>
        <div className="align-self-stretch d-flex justify-content-end">
          <div
            id="nav_more_menu"
            className="cf-clickable d-flex align-items-center cf-py-2 _1uZ__lILVUMfuHBOTaFTvg "
          >
           
          </div>
        </div>
      </nav>
    </div>
  );
};
