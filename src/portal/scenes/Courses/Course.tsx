import { MarkIcon } from "./Icons";
import parser from 'html-react-parser';
import { CoursePlayerResponse, useFetchCourseDetailQuery } from "services/courses";
import { selectLocationPayload } from "state/location/selectors";
import { useAppSelector } from "store/hooks";
import { useEffect, useState } from "react";
import { Curriculum } from "./Curriculum";
import { Goals } from './Goals';
import avatarLogo from 'static/images/avatar/profile-avatar.png'
import { PlayPreviewIcon, HamburgerIcon, IconNew, BulletIcon, PeopIcon } from "./Icons";
import { SignupSection } from 'portal/scenes/SignupSection';
import { SiginSection } from 'portal/scenes/SignupSection/SigninSection';
import { SignupModal } from 'portal/scenes/Modal/SignupModal';
import { Payment } from 'portal/scenes/Payments'
import { Modal } from 'portal/scenes/Modal';
import { selectModal } from 'state/modals/modalSlice';


export const ProjectCourse = () => {
  const locationPayload = useAppSelector(selectLocationPayload)
  const { data: courseQuery } = useFetchCourseDetailQuery(locationPayload.slug)
  const [course, setCourse] = useState<CoursePlayerResponse>()
  const modal = useAppSelector(selectModal)
  useEffect(() => {
    if (courseQuery) {
      setCourse(courseQuery)
    }
  }, [courseQuery])

  if (!course) return null;
 
  return (
    <div className="main-content">
      <div
        className="ud-app-loader ud-component--browser-warning--browser-warning udlite-container ud-app-loaded"
        data-module-id="common/udlite/desktop"
      />
      <div className="paid-course-landing-page__container">
        <div className="clp-component-render">
          <div id="schema_markup"></div>
        </div>
        <div className="sidebar-container-position-manager">
          <div className="clp-component-render">
            <div className="clp-component-render">
              <div
                className="ud-component--course-landing-page-udlite--sidebar-container"
                
              >
                <div

                  className="course-landing-page_sidebar-container "
                >
                  <div className="sidebar-container--content--gsvyJ">
                    <div className="sidebar-container--content-group--1upV8">
                      <div className="sidebar-container--introduction-asset--5ckuC">
                        <div className="intro-asset--wrapper--zDTjg">
                          <div
                            className="intro-asset--asset--1eSsi"

                          >
                            <button
                              type="button"
                              className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md udlite-custom-focus-visible intro-asset--placeholder--16yPA"
                              aria-label="Play course preview"
                            >
                              <span className="intro-asset--img-aspect--1UbeZ">
                                <img
                                  src={course?.cover_image}

                                  alt=""
                                  style={{
                                    backgroundSize: "cover",
                                    backgroundImage: 'url("data:image/png',
                                  }}
                                  width={240}
                                  height={135}
                                />
                              </span>
                              <span className="intro-asset--overlay--3Z3co intro-asset--gradient--Od7zs" />
                              <span className="udlite-play-overlay">
                                <PlayPreviewIcon />
                              </span>
                              <span className="udlite-heading-md intro-asset--overlay--3Z3co intro-asset--text--2vUCP">
                                Preview this course
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-container--purchase-section--17KRp">
                        <div className="purchase-section-container--layered-purchase-section--2LsIC">
                          <div className="purchase-section-container--inverted-color--3oaw2">
                           
                            <div className="purchase-section-container--section--3f8NY">
                              <div className="purchase-section-container--layered-purchase-panel--1qmqo purchase-options--panel--3CKg4 panel--panel--3uDOH">
                                <span
                                  id="u18-accordion-panel--6"
                                  data-type="radio"
                                  data-name="u18-accordion--3"
                                  data-checked="checked"
                                  style={{ display: "none" }}
                                />
                                <div
                                  className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md udlite-accordion-panel-toggler panel--panel-toggler--30J_B panel--outer-panel-toggler--3I6w6"
                                  data-css-toggle-id="u18-accordion-panel--6"
                                >
                                  <div className="udlite-accordion-panel-heading">
                                    <span className="purchase-options--option-radio--1zjJ_ udlite-fake-toggle-input udlite-fake-toggle-radio udlite-fake-toggle-radio-small" />
                                    <h3>
                                      <button
                                        type="button"
                                        aria-disabled="false"
                                        aria-expanded="false"
                                        className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md js-panel-toggler panel--panel-toggler--30J_B"
                                        id="u18-accordion-panel-title--7"
                                      >
                                        <span className="udlite-accordion-panel-title">
                                          Buy Project
                                        </span>
                                      </button>
                                    </h3>
                                    <div className="udlite-purchase-option-details purchase-section-container--purchase-panel-price-text--1hPdJ">
                                      <div>
                                        <div
                                          className="price-text--container--103D9 standard-purchase-panel__price-text-container udlite-clp-price-text"
                                          data-purpose="price-text-container"
                                        >
                                          <div
                                            className="price-text--price-part--2npPm standard-purchase-panel__discount-price-text udlite-clp-discount-price udlite-heading-md"
                                            data-purpose="course-price-text"
                                          >
                                            <span className="udlite-sr-only">
                                              Current price
                                            </span>
                                            <span>
                                              <span>$13.99</span>
                                            </span>
                                          </div>
                                          <div
                                            className="price-text--price-part--2npPm price-text--original-price--1sDdx udlite-clp-list-price udlite-text-sm"
                                            data-purpose="original-price-container"
                                          >
                                            <div data-purpose="course-old-price-text">
                                              <span className="udlite-sr-only">
                                                Original Price
                                              </span>
                                              <span>
                                                <s>
                                                  <span>$89.99</span>
                                                </s>
                                              </span>
                                            </div>
                                          </div>
                                          <div
                                            className="price-text--price-part--2npPm standard-purchase-panel__percent_discount-text udlite-clp-percent-discount udlite-text-sm"
                                            data-purpose="discount-percentage"
                                          >
                                            <span className="udlite-sr-only">
                                              Discount
                                            </span>
                                            <span>84% off</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="panel--content-wrapper--1g5eE"
                                  aria-labelledby="u18-accordion-panel-title--7"
                                  aria-hidden="true"
                                  role="region"
                                >
                                  <div className="udlite-accordion-panel-content panel--content--2q9WW">
                                    <div
                                      className="generic-purchase-section--main-cta-container--3xxeM"
                                      data-purpose="purchase-section"
                                    >
                                      <div className="generic-purchase-section--buy-box-main--siIXV">
                                        <div
                                          className="buy-box--buy-box--3d_i8"
                                          data-purpose="buy-box"
                                        >
                                          <div className="buy-box--buy-box-item--1Qbkl" />
                                          <div className="buy-box--buy-box-item--1Qbkl">
                                            <div>
                                              <div
                                                className="price-text--container--103D9 udlite-clp-price-text"
                                                data-purpose="price-text-container"
                                              >
                                                <div
                                                  className="price-text--price-part--2npPm udlite-clp-discount-price udlite-heading-xxl"
                                                  data-purpose="course-price-text"
                                                >
                                                  <span className="udlite-sr-only">
                                                    Current price
                                                  </span>
                                                  <span>
                                                    <span>$13.99</span>
                                                  </span>
                                                </div>
                                                
                                               
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <div className="buy-box--buy-box-item--1Qbkl buy-box--add-to-cart-button-wrapper--1VwJj">
                                            <div data-purpose="add-to-cart">
                                              <button
                                                type="button"
                                                className="udlite-btn udlite-btn-large udlite-btn-brand udlite-heading-md add-to-cart"
                                                style={{ width: "100%" }}
                                              >
                                                Buy Now
                                              </button>
                                            </div>
                                          </div>
                                          
                                        </div>
                                      </div>
                                      <div className="generic-purchase-section--local-incentive--HzlK6">
                                        <div
                                          className="money-back-guarantee--money-back-guarantee--16UWd"
                                          data-purpose="money-back-guarantee"
                                        >
                                          <span className="money-back">
                                            30-Day Money-Back Guarantee
                                          </span>
                                        </div>
                                      </div>
                                      <div className="generic-purchase-section--local-incentive--HzlK6">
                                        <div
                                          className="udlite-text-xs full-lifetime-access--full-lifetime-access--22vGb"
                                          data-purpose="full-lifetime-access"
                                        >
                                          Full Lifetime Access
                                        </div>
                                      </div>
                                      <div className="generic-purchase-section--local-incentive--HzlK6" />
                                      <div className="generic-purchase-section--ctas--1wqHF" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="top-container dark-background">
          <div className="dark-background-inner-position-container">
            <div >
              <div className="course-landing-page__main-content course-landing-page__topic-menu dark-background-inner-text-container">
                <div className="clp-component-render">
                  <div className="topic-menu udlite-breadcrumb">
                  {course?.category?.parent?.parent && (<>
                    
                    <a
                      className="udlite-heading-sm"
                      href=""
                    >
                      {course?.category?.parent.parent?.title}
                    </a>
                    <HamburgerIcon />
                    </>)}
                    {course?.category?.parent && (<>
                    
                    <a
                      className="udlite-heading-sm"
                      href=""
                    >
                      {course?.category?.parent.title}
                    </a>
                    <HamburgerIcon />
                    </>)}
                    
                    
                    <a
                      className="udlite-heading-sm"
                      href=""
                    >
                      {course?.category?.title}
                    </a>
                  </div>
                </div>
              </div>
              <div className="course-landing-page__main-content dark-background-inner-text-container"></div>
              <div className="course-landing-page__introduction-asset__main">
                <div className="clp-component-render">
                  <div className="clp-component-render">
                    <div
                      className="ud-component--course-landing-page-udlite--introduction-asset"

                    >
                      <div className="intro-asset--wrapper--zDTjg">
                        <div
                          className="intro-asset--asset--1eSsi"
                          data-purpose="introduction-asset"
                        >
                          <button
                            type="button"
                            className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md udlite-custom-focus-visible intro-asset--placeholder--16yPA"
                            aria-label="Play course preview"
                          >
                            <span className="intro-asset--img-aspect--1UbeZ">
                              <img
                                src={course?.cover_image}

                                alt=""
                                style={{
                                  backgroundSize: "cover",
                                  backgroundImage: 'url("data:image/png',
                                }}
                                width={240}
                                height={135}
                              />
                            </span>
                            <span className="intro-asset--overlay--3Z3co intro-asset--gradient--Od7zs" />
                            <span className="udlite-play-overlay">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                className="udlite-icon udlite-icon-xxlarge udlite-focus-visible-target"
                              >
                                <use xlinkHref="#icon-play-overlay" />
                              </svg>
                            </span>
                            <span className="udlite-heading-md intro-asset--overlay--3Z3co intro-asset--text--2vUCP">
                              Preview this course
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course-landing-page__main-content dark-background-inner-text-container">
                <div className="clp-component-render">
                  <div className="udlite-text-sm clp-lead">
                    <div className="clp-component-render">
                      <h1
                        className="udlite-heading-xl clp-lead__title clp-lead__title--small"
                        data-purpose="lead-title"
                      >
                        {course?.title}
                      </h1>
                      <div
                        className="udlite-text-md clp-lead__headline"
                        data-purpose="lead-headline"
                      >
                        {course?.headline}
                      </div>
                    </div>

                    <div className="clp-lead__element-item">
                      <div className="clp-component-render">
                        <div className="clp-component-render">
                          <div
                            className="ud-component--course-landing-page-udlite--instructor-links"

                          >
                            <div
                              className="instructor-links--instructor-links--3d8_F"
                              data-purpose="instructor-name-top"
                            >
                              <span className="instructor-links--names--7UPZj">
                                <span className="udlite-text-sm">
                                  Created by
                                </span>{" "}
                                <a
                                  className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md udlite-text-sm udlite-instructor-links"
                                  data-position={1}
                                  href="#instructor-1"
                                >
                                  <span>{course?.instructor?.first_name ? `${course?.instructor?.first_name} ${course?.instructor?.last_name}` : course?.instructor?.email}</span>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clp-lead__element-meta">
                      <div className="clp-lead__element-item">
                        <div className="clp-component-render">
                          <div
                            className="last-update-date"
                            data-purpose="last-update-date"
                          >
                            <span className="last-update-date__icon">
                              <IconNew />
                            </span>
                            <span>Last updated 8/2021</span>
                          </div>
                        </div>
                      </div>


                    </div>
                    <div className="clp-lead__element-row">
                      <div className="clp-lead__element-item">
                        <div className="ud-component--course-landing-page-udlite--course-context-menu-clp" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course-landing-page__main-content course-landing-page__purchase-section__main dark-background-inner-text-container">
                <div className="clp-component-render">
                  <div className="clp-component-render">
                    <div
                      className="ud-component--course-landing-page-udlite--purchase-body-container"
                      
                    >
                      <div className="purchase-section-container--layered-purchase-section--2LsIC">
                        <div className="purchase-section-container--inverted-color--3oaw2">
                          
                          <div className="purchase-section-container--section--3f8NY">
                            <div className="purchase-section-container--layered-purchase-panel--1qmqo purchase-options--panel--3CKg4 panel--panel--3uDOH">
                              <span
                                id="u19-accordion-panel--4"
                                data-type="radio"
                                data-name="u19-accordion--1"
                                data-checked="checked"
                                style={{ display: "none" }}
                              />
                              <div
                                className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md udlite-accordion-panel-toggler panel--panel-toggler--30J_B panel--outer-panel-toggler--3I6w6"
                                data-css-toggle-id="u19-accordion-panel--4"
                              >
                                <div className="udlite-accordion-panel-heading">
                                  <span className="purchase-options--option-radio--1zjJ_ udlite-fake-toggle-input udlite-fake-toggle-radio udlite-fake-toggle-radio-small" />
                                  <h3>
                                    <button
                                      type="button"
                                      aria-disabled="false"
                                      aria-expanded="false"
                                      className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md js-panel-toggler panel--panel-toggler--30J_B"
                                      id="u19-accordion-panel-title--5"
                                    >
                                      <span className="udlite-accordion-panel-title">
                                        Buy Project
                                      </span>
                                    </button>
                                  </h3>
                                  <div className="udlite-purchase-option-details purchase-section-container--purchase-panel-price-text--1hPdJ">
                                    <div>
                                      <div
                                        className="price-text--container--103D9 standard-purchase-panel__price-text-container udlite-clp-price-text"
                                        data-purpose="price-text-container"
                                      >
                                        <div
                                          className="price-text--price-part--2npPm standard-purchase-panel__discount-price-text udlite-clp-discount-price udlite-heading-md"
                                          data-purpose="course-price-text"
                                        >
                                          <span className="udlite-sr-only">
                                            Current price
                                          </span>
                                          <span>
                                            <span>$13.99</span>
                                          </span>
                                        </div>
                                        <div
                                          className="price-text--price-part--2npPm price-text--original-price--1sDdx udlite-clp-list-price udlite-text-sm"
                                          data-purpose="original-price-container"
                                        >
                                          <div data-purpose="course-old-price-text">
                                            <span className="udlite-sr-only">
                                              Original Price
                                            </span>
                                            <span>
                                              <s>
                                                <span>$89.99</span>
                                              </s>
                                            </span>
                                          </div>
                                        </div>
                                        <div
                                          className="price-text--price-part--2npPm standard-purchase-panel__percent_discount-text udlite-clp-percent-discount udlite-text-sm"
                                          data-purpose="discount-percentage"
                                        >
                                          <span className="udlite-sr-only">
                                            Discount
                                          </span>
                                          <span>84% off</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="panel--content-wrapper--1g5eE"
                                aria-labelledby="u19-accordion-panel-title--5"
                                aria-hidden="true"
                                role="region"
                              >
                                <div className="udlite-accordion-panel-content panel--content--2q9WW">
                                  <div
                                    className="generic-purchase-section--main-cta-container--3xxeM"
                                    data-purpose="purchase-section"
                                  >
                                    <div className="generic-purchase-section--buy-box-main--siIXV">
                                      <div
                                        className="buy-box--buy-box--3d_i8"
                                        data-purpose="buy-box"
                                      >
                                        <div className="buy-box--buy-box-item--1Qbkl" />
                                        <div className="buy-box--buy-box-item--1Qbkl">
                                          <div>
                                            <div
                                              className="price-text--container--103D9 udlite-clp-price-text"
                                              data-purpose="price-text-container"
                                            >
                                              <div
                                                className="price-text--price-part--2npPm udlite-clp-discount-price udlite-heading-xxl"
                                                data-purpose="course-price-text"
                                              >
                                                <span className="udlite-sr-only">
                                                  Current price
                                                </span>
                                                <span>
                                                  <span>$13.99</span>
                                                </span>
                                              </div>
                                              
                                            </div>
                                          </div>
                                        </div>
                                       
                                        <div className="buy-box--buy-box-item--1Qbkl buy-box--add-to-cart-button-wrapper--1VwJj">
                                          <div data-purpose="add-to-cart">
                                            <button
                                              type="button"
                                              className="udlite-btn udlite-btn-large udlite-btn-brand udlite-heading-md add-to-cart"
                                              style={{ width: "100%" }}
                                            >
                                              Buy Now
                                            </button>
                                          </div>
                                        </div>
                                        
                                      </div>
                                    </div>
                                    <div className="generic-purchase-section--local-incentive--HzlK6">
                                      <div
                                        className="money-back-guarantee--money-back-guarantee--16UWd"
                                        data-purpose="money-back-guarantee"
                                      >
                                        <span className="money-back">
                                          30-Day Money-Back Guarantee
                                        </span>
                                      </div>
                                    </div>
                                    <div className="generic-purchase-section--local-incentive--HzlK6">
                                      <div
                                        className="udlite-text-xs full-lifetime-access--full-lifetime-access--22vGb"
                                        data-purpose="full-lifetime-access"
                                      >
                                        Full Lifetime Access
                                      </div>
                                    </div>
                                    <div className="generic-purchase-section--local-incentive--HzlK6" />
                                    <div className="generic-purchase-section--ctas--1wqHF">
                                      <div className="generic-purchase-section--cta--2yuje">
                                        <div>
                                          <button
                                            type="button"
                                            data-purpose="toggle-wishlist"
                                            className="udlite-btn udlite-btn-medium udlite-btn-secondary udlite-heading-sm"
                                            style={{ width: "100%" }}
                                          >
                                            <span>Add to Wishlist</span>
                                            <svg
                                              aria-hidden="true"
                                              focusable="false"
                                              className="udlite-icon udlite-icon-small"
                                              style={{
                                                fill: "transparent",
                                                padding: "1px",
                                                stroke: "currentcolor",
                                                strokeWidth: 2,
                                              }}
                                            >
                                              <use xlinkHref="#icon-wishlisted" />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <div className="generic-purchase-section--cta--2yuje generic-purchase-section--cta-share--2qwpR">
                                        <button
                                          type="button"
                                          style={{ width: "100%" }}
                                          data-purpose="social-share-button"
                                          className="udlite-btn udlite-btn-medium udlite-btn-secondary udlite-heading-sm"
                                        >
                                          <span>Share</span>
                                          <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            className="udlite-icon udlite-icon-xsmall"
                                          >
                                            <use xlinkHref="#icon-share" />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className="generic-purchase-section--cta--2yuje">
                                        <a
                                          aria-disabled="false"
                                          href="/gift/coding-interview-bootcamp-algorithms-and-data-structure/?trigger_exp_platform=true&couponCode=LV2LRNCP80921B"
                                          data-purpose="gift-course"
                                          className="udlite-btn udlite-btn-medium udlite-btn-secondary udlite-heading-sm"
                                          style={{ width: "100%" }}
                                        >
                                          <span>Gift this course</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course-landing-page__main-content course-landing-page__draft-warning" />
              <div className="ud-component--course-landing-page-udlite--sidebar-container-top-mark">
                <span style={{ position: "relative" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-container">
         
          <div className="course-landing-page__main-content component-margin">
            <div className="clp-component-render">
              <span id="objective" className="in-page-offset-anchor" />
              <div className="clp-component-render">
                <div
                  className="ud-component--course-landing-page-udlite--whatwillyoulearn"

                >
                  <Goals goals={course?.goals} />
                </div>
              </div>
            </div>
          </div>

          <Curriculum sections={course.sections} />

          <div className="course-landing-page__main-content component-margin">
            <div className="clp-component-render">
              <div className="clp-component-render">
                <div
                  className="ud-component--course-landing-page-udlite--requirements"
                 
                >
                  <div>
                    <h2 className="udlite-heading-xl requirements--title--2j7S2">
                      Requirements
                    </h2>
                    <ul className="unstyled-list udlite-block-list">
                      { course?.requirements?.map(req => 
                        (<li>
                          <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                            <BulletIcon />
                            <div className="udlite-block-list-item-content">
                             {req.name}
                            </div>
                          </div>
                        </li>))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="course-landing-page__main-content component-margin"
            
          ></div>
          <div className="course-landing-page__main-content component-margin">
            <div className="clp-component-render">
              <div className="clp-component-render">
                <div
                  className="ud-component--course-landing-page-udlite--description"
                  
                >
                  <div
                    className="udlite-text-sm  styles--description--3y4KY"
                    data-purpose="course-description"
                  >
                    <h2 className="udlite-heading-xl styles--description__header--3SNsO">
                      Description
                    </h2>
                    <div className="show-more--container--3W59b">
                      <span
                        id="u472-show-more--1"
                        data-type="checkbox"
                        data-checked
                        style={{ display: "none" }}
                      />
                      <div
                        style={{ maxHeight: "221px" }}
                        className="show-more--content--2BLF7 show-more--with-gradient--2hRXX"
                      >
                        <div>
                          <div data-purpose="safely-set-inner-html:description:description">
                            {parser(course?.description)}
                          </div>
                          <div
                            className="styles--audience--2pZ0S"
                            data-purpose="target-audience"
                          >
                            <h2 className="udlite-heading-xl styles--audience__title--1Sob_">
                              Who this course is for:
                            </h2>
                            <ul className="styles--audience__list--3NCqY">
                              {course?.experiences?.map(exp => (
                                <>
                                
                                <li>
            
                                  {exp.name}
                                </li>
                                </>
                              ))}

                            </ul>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="udlite-btn udlite-btn-medium udlite-btn-ghost udlite-heading-sm show-more--focusable-label--3hlDG"
                        data-css-toggle-id="u472-show-more--1"
                      >
                        <span>
                          <span className="show-more--show-more--2shcc">
                            Show more
                          </span>
                          <span className="show-more--show-less--1sOfy">
                            Show less
                          </span>
                        </span>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          className="udlite-icon udlite-icon-xsmall show-more--show-more--2shcc"
                        >
                          <use xlinkHref="#icon-expand" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          className="udlite-icon udlite-icon-xsmall show-more--show-less--1sOfy"
                        >
                          <use xlinkHref="#icon-collapse" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="course-landing-page__main-content component-margin">
            <div className="clp-component-render">
              <div
                className="ud-component--course-landing-page-udlite--practice-test-bundle"
                data-skip-hydration="true"
                data-component-props="{}"
              >
                <div />
              </div>
            </div>
          </div>
          <div className="course-landing-page__main-content component-margin">
            <div className="clp-component-render">
              <div className="instructor">
                <span id="instructor" className="in-page-offset-anchor" />
                <div className="clp-component-render">
                  <div
                    className="ud-component--course-landing-page-udlite--instructors"

                  >
                    <div className="styles--instructors--2JsS3">
                      <h2 className="udlite-heading-xl styles--instructors__header--16F_8">
                        Instructor
                      </h2>
                      <div
                        className="instructor--instructor--1wSOF"
                        data-purpose="instructor-bio"
                      >
                        <span
                          className="in-page-offset-anchor"
                          id="instructor-1"
                        />
                        <div>
                          <div className="udlite-heading-lg udlite-link-underline instructor--instructor__title--34ItB">
                            <a href="/">{course?.instructor?.first_name ? `${course?.instructor?.first_name} ${course?.instructor?.last_name}` : course?.instructor?.email}</a>
                          </div>
                          <div className="udlite-text-md instructor--instructor__job-title--1HUmd">
                            {course?.instructor?.headline}
                          </div>
                        </div>
                        <div className="instructor--instructor__image-and-stats--1IqE7">
                          <a
                            className="instructor--instructor__image-link--9e3fA"
                            href="/"
                          >
                            <img
                              alt={course?.instructor?.first_name}
                              className="instructor--instructor__image--va-P5 udlite-avatar udlite-avatar-image"
                              width={64}
                              height={64}
                              style={{ width: "6.4rem", height: "6.4rem" }}
                              src={course?.instructor?.avatar ? course?.instructor?.avatar : avatarLogo}
                            />
                          </a>
                          <ul className="unstyled-list udlite-block-list">
                            
                            <li>
                              <div
                               
                                className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm"
                              >
                               <PeopIcon />
                                <div className="udlite-block-list-item-content">
                                  0 Students
                                </div>
                              </div>
                            </li>
                            <li>
                              <div
                                data-purpose="stat"
                                className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon"
                                >
                                  <use xlinkHref="#icon-play" />
                                </svg>
                                <div className="udlite-block-list-item-content">
                                 {course?.instructor?.courses?.length} Courses
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="show-more--container--3W59b">
                          <span
                            id="u479-show-more--1"
                            data-type="checkbox"
                            data-checked
                            style={{ display: "none" }}
                          />
                          <div
                            style={{ maxHeight: "146px" }}
                            className="show-more--content--2BLF7"
                          >
                            <div>
                              <div
                                className="udlite-text-sm instructor--instructor__description--1dHxF"
                                data-purpose="description-content"
                              >
                                {parser(course?.instructor?.description)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="course-landing-page__main-content component-margin">
            <div className="clp-component-render">
              <div className="ud-component--course-landing-page-udlite--featured-qa" />
            </div>
          </div>




        </div>
      </div>
      {modal == 'signup' && <SignupModal onClose>
        <SignupSection />
      </SignupModal>}

      {modal == 'login' && <SignupModal >
        <SiginSection />
      </SignupModal>}
    </div>
  );
};
