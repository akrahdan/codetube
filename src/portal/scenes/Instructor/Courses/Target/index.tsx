import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { CourseGoal } from "./Goal";
import { Requirements } from "./Requirements";
import { CourseExperience } from "./Experience";
import { ExperienceCreate } from "./ExperienceCreate";
import { GoalCreate } from "./GoalCreate";
import { ReqCreate } from "./ReqCreate";

import { selectSave, saveCourse } from "state/course/courseSplice";
import { usePrompt } from "../userPrompt";
import {
  selectLocationPayload,
  selectLocationType,
} from "state/location/selectors";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  useCreateExperienceMutation,
  useCreateGoalMutation,
  useCreateRequirementMutation,
  useEditExperienceMutation,
  useEditGoalMutation,
  useEditRequirementMutation,
  useFetchExperienceQuery,
  useFetchRequirementsQuery,
  useFetchGoalsQuery,
  useDeleteExperienceMutation,
  useDeleteGoalMutation,
  useDeleteRequirementMutation,
  Experience,
  Requirement,
  Goal

} from "services/courses";


import {
  selectRequirements,
  selectGoals,
  selectExperience,
} from "state/target/targetSplice";

export const Target = () => {
  const locationPath = useAppSelector(selectLocationType);

  const selectedSave = useAppSelector(selectSave);
  const dispatch = useAppDispatch()
  const locationPayload = useAppSelector(selectLocationPayload);
  const selectedRequirements = useAppSelector(selectRequirements);
  const selectedGoals = useAppSelector(selectGoals);
  const selectedExperiences = useAppSelector(selectExperience);
  const [createGoal] = useCreateGoalMutation();
  const [createExperience] = useCreateExperienceMutation();
  const [createRequirement] = useCreateRequirementMutation();
  const [editGoal] = useEditGoalMutation();
  const [editRequirement] = useEditRequirementMutation();
  const [editExperience] = useEditExperienceMutation();
  const [deleteGoal] = useDeleteGoalMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  const [deleteRequirements] = useDeleteRequirementMutation();
  const { data: requirementsQuery } = useFetchRequirementsQuery(
    locationPayload.id
  );
  const { data: goalsQuery } = useFetchGoalsQuery(locationPayload.id);
  const { data: experienceQuery } = useFetchExperienceQuery(locationPayload.id);

  const [goalsUpdate, setGoalsUpdate] = useState(selectedGoals);
  const [requirementsUpdate, setRequirementsUpdate] =
    useState(selectedRequirements);

  const [experienceUpdate, setExperienceUpdate] = useState(selectedExperiences);
  const alert = useAlert();

  const [showGoal, setShowGoal] = useState(true)
  const [showReq, setShowReq] = useState(true)
  const [showExp, setShowExp] = useState(true)
  const [goal, setGoal] = useState<Goal>()
  const [req, setReq] = useState<Requirement>()
  const [exp, setExp] = useState<Experience>()

  usePrompt(!!exp || !!goal || !!req)


  const removeGoal = (goal) => {
    deleteGoal(goal.id);
  };

  const removeReq = (req) => {
    deleteRequirements(req.id);
  };

  const removeExp = (req) => {
    deleteExperience(req.id);
  };

  useEffect(() => {
    setExperienceUpdate(selectedExperiences);
  }, [selectedExperiences]);

  useEffect(() => {
    setGoalsUpdate(selectedGoals);
  }, [selectedGoals]);

  useEffect(() => {
    setRequirementsUpdate(selectedRequirements);
  }, [selectedRequirements]);



  useEffect(() => {

    if (selectedSave.submit) {
      if (goal) {
        createGoal({
          name: goal.name,
          course: locationPayload.id,
        }).then((res: { data: Goal[] }) => {
          if (res?.data?.length) {
            setGoal(null)
            dispatch(saveCourse({
              submit: false,
              locationPath: null
            }))
            alert.show("Your data has been saved successfully")
          }
        })
      }


      if (exp) {
        createExperience({
          name: exp.name,
          course: locationPayload.id,
        }).then((res: { data: Experience[] }) => {
          if (res?.data?.length) {
            setExp(null)
            dispatch(saveCourse({
              submit: false,
              locationPath: null
            }))
            alert.show("Your data has been saved successfully")
          }
        })
      }

      if (req) {
        createRequirement({
          name: req?.name,
          course: locationPayload.id,
        }).then((res: { data: Requirement[] }) => {
          if (res?.data?.length) {
            setReq(null)
            dispatch(saveCourse({
              submit: false,
              locationPath: null
            }))
            alert.show("Your data has been saved successfully")
          }
        })


      }
      requirementsUpdate &&
        requirementsUpdate.forEach(async (req, index) => {
          if (req.name) {

            const awaitReq = await editRequirement({
              ...req,
              course: locationPayload.id,
            }).unwrap()

            if (index == requirementsUpdate?.length - 1) {
              dispatch(saveCourse({
                submit: false,
                locationPath: null
              }))
              alert.show("Your data has been saved successfully");

            }
          }
        });

      experienceUpdate &&
        experienceUpdate?.forEach(async (req, index) => {
          if (req?.name) {
            const awaitEditExp = await editExperience({
              ...req,
              course: locationPayload.id,
            }).unwrap()

            if (index == experienceUpdate.length - 1) {
              if (awaitEditExp?.name) {
                dispatch(saveCourse({
                  submit: false,
                  locationPath: null
                }))
                alert.show("Your data has been saved successfully");
              }
            }
          }
        });

      goalsUpdate &&
        goalsUpdate?.forEach(async (item, index) => {
          if (item.name) {
            const awaitEditGoal = await editGoal({
              ...item,
              course: locationPayload?.id,
            }).unwrap()
            if (index == goalsUpdate?.length - 1) {
              dispatch(saveCourse({
                submit: false,
                locationPath: null
              }))
              alert.show("Your data has been saved successfully");
            }
          }
        });
    }
  }, [selectedSave]);
  return (
    <div>
      <div className="sub-header--wrapper--3Vunm">
        <div className="sub-header--main-content--22it3">
          <h2
            data-purpose="page-title"
            className="font-heading-serif-xl sub-header--title--2VD8q"
          >
            Target your students
          </h2>
        </div>
      </div>
      <div className="main-content--wrap_component--2TEkz">

        <div className="form_container">
          <div className="goals-form--subtitle--3R5d-">
            The descriptions you write here will help students decide if your
            course is the one for them.
          </div>
          <form>
            <div>
              <div className="form-group">
                <label htmlFor="learn-goal" className="control-label">
                  What will students learn in your course?
                </label>
                <div>
                  <div>
                    {goalsUpdate &&
                      goalsUpdate.map((goal) => (
                        <CourseGoal
                          key={goal.id}
                          goal={goal}
                          handleRemove={removeGoal}
                          handleChange={(obj) => {
                            let gUpdate = [...goalsUpdate];
                            let index = gUpdate?.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            gUpdate[index] = obj;
                            setGoalsUpdate(gUpdate);
                          }}
                        />
                      ))}
                    {showGoal && <GoalCreate
                      goal={goal}
                      handleRemove={(value) => {
                        setGoal(null)
                        setShowGoal(!showGoal)
                      }}
                      handleChange={(obj) => {

                        setGoal({
                          name: obj?.name,
                          id: obj?.id,
                          course: locationPayload.id
                        })
                      }}
                    />}
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  if (!showGoal) {
                    setGoal(null)
                    setShowGoal(!showGoal)
                  }
                  if (goal) {
                    createGoal({
                      name: goal.name,
                      course: goal.course,
                    }).then((res: { data: Goal[] }) => {
                      if (res?.data?.length) {

                        setGoal(null)
                        if (!showGoal) {
                          setShowGoal(!showGoal)
                        }

                      }
                    })
                  } else {
                    return;
                  }
                }}
                type="button"
                className="goals-form--button--2_zb1 btn btn-tertiary"
              >
                <span className="mr5 cfi cfi-add" /> Add an answer
              </button>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="requirements" className="control-label">
                  Are there any course requirements or prerequisites?
                </label>
                <div>
                  <div>
                    {requirementsUpdate &&
                      requirementsUpdate.map((req) => (
                        <Requirements
                          req={req}
                          key={req.id}
                          handleRemove={removeReq}
                          handleChange={(obj) => {
                            let reqUpdates = [...requirementsUpdate];
                            let index = reqUpdates?.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            reqUpdates[index] = obj;
                            setRequirementsUpdate(reqUpdates);
                          }}
                        />
                      ))}

                    {showReq && <ReqCreate
                      req={req}

                      handleRemove={(value) => {
                        setReq(null)
                        setShowReq(!showReq)
                      }}
                      handleChange={(obj) => {
                        setReq({
                          name: obj.name,
                          course: locationPayload.id,
                          id: obj.id
                        })
                      }}
                    />}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!showReq) {
                    setReq(null)
                    setShowReq(!showReq)
                  }
                  if (req) {
                    createRequirement({
                      name: req.name,
                      course: req.course,
                    }).then((res: { data: Requirement[] }) => {
                      if (res?.data?.length) {

                        setReq(null)
                        if (!showReq) {
                          setShowReq(!showReq)
                        }

                      }
                    })
                  } else {
                    return;
                  }
                }}
                type="button"
                className="goals-form--button--2_zb1 btn btn-tertiary"
              >
                <span className="mr5 cfi cfi-add" /> Add an answer
              </button>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="target-student" className="control-label">
                  Who are your target students?
                </label>
                <div>
                  <div>
                    {experienceUpdate &&
                      experienceUpdate.map((exp) => (
                        <CourseExperience
                          key={exp?.id}
                          experience={exp}
                          handleRemove={removeExp}
                          handleChange={(obj) => {
                            let expUpdate = [...experienceUpdate];

                            let index = expUpdate.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            expUpdate[index] = obj;
                            setExperienceUpdate(expUpdate);
                          }}
                        />
                      ))}

                    {showExp && <ExperienceCreate
                      experience={exp}
                      handleRemove={(value) => {
                        setExp(null)
                        setShowExp(!showExp)
                      }}
                      handleChange={(obj) => {

                        setExp({
                          name: obj.name,
                          course: locationPayload.id,
                          id: obj.id
                        });
                      }}
                    />}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!showExp) {
                    setExp(null)
                    setShowExp(!showExp)
                  }
                  if (exp) {
                    createExperience({
                      name: exp.name,
                      course: exp.course,
                    }).then((res: { data: Experience[] }) => {
                      if (res?.data?.length) {
                        setExp(null)
                        if (!showExp) {
                          setShowExp(!showExp)
                        }

                      }
                    })
                  } else {
                    return;
                  }
                }}
                type="button"
                className="goals-form--button--2_zb1 btn btn-tertiary"
              >
                <span className="mr5 cfi cfi-add" /> Add an answer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Target;
