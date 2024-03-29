import { useEffect, useState } from "react";
import { selectLocationPayload } from "state/location/selectors";
import { useAppSelector } from "store/hooks";
import { selectPricing } from "state/course/courseSplice";
import { selectSections } from "state/curriculum/currriculumSplice";
import { useAlert } from "react-alert";
import {
  useFetchPricingCurrencyQuery,
  useFetchPricingTierQuery,
  useCreatePricingMutation,
  useFetchPricingQuery,
  useFetchSectionsQuery,
  useUpdatePricingMutation,
  Pricing
} from "services/courses";
import classNames from "classnames";

export const CoursePricing = () => {
  const alert = useAlert()
  const { data: currencies } = useFetchPricingCurrencyQuery();
  const { data: tiers } = useFetchPricingTierQuery();
  const [createPricing] = useCreatePricingMutation();
  const [updatePricing] = useUpdatePricingMutation();
  const selectedSections = useAppSelector(selectSections)
  const locationPayload = useAppSelector(selectLocationPayload)
  const { data: querySections } = useFetchSectionsQuery(locationPayload.id)
  const payload = useAppSelector(selectLocationPayload);
  const { data: pricingQuery } = useFetchPricingQuery(payload.id);
  const pricing = useAppSelector(selectPricing);
  const [toggleCurrency, setToggleCurrency] = useState(false);
  const [toggleTier, setToggleTier] = useState(false);
  const [currency, setCurrency] = useState({
    name: "USD",
    display: "USD",
  });
  const [amount, setAmount] = useState({
    name: '100',
    display: "100",
  });

  useEffect(() => {
    if (pricing) {
      setCurrency({
        name: pricing.currency,
        display: pricing.currency,
      });

      setAmount({
        name: pricing.amount,
        display: pricing.amount,
      });
    }
  }, [pricing]);
  return (
    <div>
      <div className="sub-header--wrapper--3Vunm">
        <div className="sub-header--main-content--22it3">
          <h2
            data-purpose="page-title"
            className="font-heading-serif-xl sub-header--title--2VD8q"
          >
            Pricing
          </h2>
        </div>
      </div>
      <div className="main-content--wrap_component--2TEkz">

        <div data-purpose="price-route">
          <div className="mb30">
            <div>
              <div data-name="owner-opt-in">
                <h4 className="blockLabel">Course Price Tier</h4>
                <div className="mb30 mt20">
                  <p data-purpose="safely-set-inner-html:price-form:link-to-price-tier-matrix">
                    Please select the price tier for your course below and click
                    'Save'.
                  </p>

                  <span data-purpose="practice-course-message" />
                </div>
              </div>
              <div className="fx-jsb db-sm mt10">
                <div className="fx-jsb">
                  <div className="pr20">
                    <div className="dib" style={{ verticalAlign: "top" }}>
                      <div
                        data-purpose="price-select"
                        className="price-select--price-select--3gmzG form-group"
                      >
                        <div className="df">
                          <div className="fx-jsb mr20">
                            <div
                              className={classNames(
                                "dropdown btn-group btn-group-default",
                                {
                                  open: toggleCurrency,
                                }
                              )}
                            >
                              <button
                                onClick={() =>
                                  setToggleCurrency(!toggleCurrency)
                                }
                                id="select-currency"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                                type="button"
                                className="dropdown-toggle btn btn-default"
                                style={{ paddingRight: "26px" }}
                              >
                                {currency.display}
                                <span
                                  style={{
                                    position: "absolute",
                                    right: "12px",
                                  }}
                                >
                                  <span className="dropdown-caret cfi cfi-angle-down" />
                                </span>
                              </button>
                              <ul
                                role="menu"
                                className="dropdown-menu"
                                aria-labelledby="select-currency"
                              >
                                {currencies &&
                                  currencies.map((curr) => (
                                    <li key={curr.name} role="presentation">
                                      <a
                                        onClick={() => {
                                          setCurrency(curr);
                                          setToggleCurrency(!toggleCurrency);
                                        }}
                                        role="menuitem"
                                        tabIndex={-1}
                                       
                                      >
                                        {curr.display}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                          <div className="fx-jsb mr20">
                            <div
                              className={classNames(
                                "dropdown btn-group btn-group-default",
                                {
                                  open: toggleTier,
                                }
                              )}
                            >
                              <button
                                onClick={() => setToggleTier(!toggleTier)}
                                id="select-amount"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                                type="button"
                                className="dropdown-toggle btn btn-default"
                                style={{ paddingRight: "26px" }}
                              >
                                <div className="dib">
                                  <div className="price-select--price-select__title-spacer--3OZvO">
                                    <span>{`${currency.display} ${amount.display}`}</span>
                                  </div>
                                  {`${currency.display} ${amount.display}`}
                                </div>
                                <span
                                  style={{
                                    position: "absolute",
                                    right: "12px",
                                  }}
                                >
                                  <span className="dropdown-caret cfi cfi-angle-down" />
                                </span>
                              </button>
                              <ul
                                role="menu"
                                className="dropdown-menu"
                                aria-labelledby="select-amount"
                              >
                                <li role="presentation" className="active">
                                  <a
                                    data-purpose="select-amount-"
                                    role="menuitem"
                                    tabIndex={-1}
                                 
                                  >
                                    Select
                                  </a>
                                </li>
                                {tiers &&
                                  tiers.map((tier, index) => (
                                    <li key={tier.name} role="presentation">
                                      <a
                                        onClick={() => {
                                          setAmount(tier);
                                          setToggleTier(!toggleTier);
                                        }}
                                        role="menuitem"
                                        tabIndex={-1}
                                      >
                                        {currency.display} {tier.display}
                                        <span className="text-midnight-lighter">
                                          (tier {index + 1})
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dib">
                      <button
                        onClick={() => {
                          if (pricing?.amount) {
                            updatePricing({
                              course: payload.id,
                              amount: amount.name,
                              currency: currency.name,
                            }).then((res: { data: Pricing }) => {
                              if (res?.data?.amount) {
                                alert.show('Your changes have been saved')
                              }
                            })

                          } else {
                            createPricing({
                              course: payload.id,
                              amount: amount.name,
                              currency: currency.name,
                            }).then((res: { data: Pricing }) => {
                              if (res?.data?.amount) {
                                alert.show('Your changes have been saved')
                              }
                            });
                          }

                        }}
                        disabled={!currency || !amount}
                        type="submit"
                        className="btn btn-secondary btn-block"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricing;
