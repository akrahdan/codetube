import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Goal } from "./Goal";
import { Requirements } from "./Requirements";
import { Experience } from "./Experience";
import { ExperienceCreate } from "./ExperienceCreate";
import { GoalCreate } from "./GoalCreate";
import { ReqCreate } from "./ReqCreate";

import { selectSave } from "state/course/courseSplice";
import { usePrompt } from "../userPrompt";
import {
  selectLocationPayload,
  selectLocationType,
} from "state/location/selectors";
import { useAppSelector } from "store/hooks";
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
} from "services/courses";

import {
  selectRequirements,
  selectGoals,
  selectExperience,
} from "state/target/targetSplice";

export const Target = () => {
  const locationPath = useAppSelector(selectLocationType);
  const selectedSave = useAppSelector(selectSave);
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

  const [goals, setGoals] = useState([{ id: "goalList--0", name: "" }]);
  const [requirements, setRequirements] = useState([
    { id: "reqList--0", name: "" },
  ]);

  const [experience, setExperience] = useState([
    { id: "expList--0", name: "" },
  ]);
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
    const goalResults = goals;
    goalResults &&
      goalResults.forEach((goal) => {
        if (goal.name) {
          createGoal({
            name: goal.name,
            course: locationPayload.id,
          }).then(() => {
            const results = goalResults.filter((item) => item.id != goal.id);
            setGoals(results);
            alert.show("Your data has been saved successfully")
          });
        }
      });

    const experienceResults = experience;
    experienceResults &&
      experienceResults.forEach((exp) => {
        if (exp.name) {
          createExperience({
            name: exp.name,
            course: locationPayload.id,
          }).then(() => {
            const results = experienceResults.filter(
              (item) => item.id != exp.id
            );
            setExperience(results);
            alert.show("Your data has been saved successfully")
          });
        }
      });

    const reqResults = requirements;
    reqResults &&
      reqResults.forEach((req) => {
        if (req.name) {
          createRequirement({
            name: req.name,
            course: locationPayload.id,
          }).then(() => {
            const results = reqResults.filter((item) => item.id != req.id);
            setRequirements(results);
            alert.show("Your data has been saved successfully")
          });
        }
      });
    requirementsUpdate &&
      requirementsUpdate.forEach((req) => {
        if (req.name) {
          console.log("Req: ", req);
          editRequirement({
            ...req,
            course: locationPayload.id,
          }).then(() => {
           
            alert.show("Your data has been saved successfully");
          });
        }
      });

    experienceUpdate &&
      experienceUpdate.forEach((req, index) => {
        if (req.name) {
          editExperience({
            ...req,
            course: locationPayload.id,
          }).then(() => {
           
            alert.show("Your data has been saved successfully");
          });
        }
      });

    goalsUpdate &&
      goalsUpdate.forEach((item) => {
        if (item.name) {
          editGoal({
            ...item,
            course: locationPayload.id,
          }).then(() => {
            alert.show("Your data has been saved successfully");
          });
        }
      });
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
        {" "}
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
                        <Goal
                          key={goal.id}
                          goal={goal}
                          handleRemove={removeGoal}
                          handleChange={(obj) => {
                            let gUpdate = [...goalsUpdate];
                            let index = gUpdate.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            gUpdate[index] = obj;
                            setGoalsUpdate(gUpdate);
                          }}
                        />
                      ))}
                    {goals.map((goal) => (
                      <GoalCreate
                        key={goal.id}
                        goal={goal}
                        handleRemove={(value) => {
                          const updatedGoals = goals.filter(
                            (result) => result.id != value.id
                          );
                          setGoals(updatedGoals);
                        }}
                        handleChange={(obj) => {
                          let newGoals = [...goals];
                          let index = newGoals.findIndex((item) => {
                            return item.id == obj.id;
                          });
                          newGoals[index] = obj;
                          setGoals(newGoals);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const goalItem = {
                    id: `goalList--${goals.length}`,
                    name: "",
                  };
                  const newGoals = [...goals, goalItem];
                  const emptyValue = goals.filter((item) => item.name == "");
                  if (emptyValue.length) {
                    return;
                  } else {
                    setGoals(newGoals);
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
                            let index = reqUpdates.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            reqUpdates[index] = obj;
                            setRequirementsUpdate(reqUpdates);
                          }}
                        />
                      ))}

                    {requirements.map((req) => (
                      <ReqCreate
                        req={req}
                        key={req.id}
                        handleRemove={(value) => {
                          const updatedReqs = requirements.filter(
                            (result) => result.id != value.id
                          );
                          setRequirements(updatedReqs);
                        }}
                        handleChange={(obj) => {
                          let reqs = [...requirements];
                          let index = reqs.findIndex((item) => {
                            return item.id == obj.id;
                          });
                          reqs[index] = obj;
                          setRequirements(reqs);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const reqItem = {
                    id: `reqList--${requirements.length}`,
                    value: "",
                  };
                  const newReqs = [...requirements, reqItem];
                  const emptyValue = requirements.filter(
                    (item) => item.name == ""
                  );
                  if (emptyValue.length) {
                    return;
                  } else {
                    setRequirements(newReqs);
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
                        <Experience
                          key={exp.id}
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

                    {experience.map((exp) => (
                      <ExperienceCreate
                        key={exp.id}
                        experience={exp}
                        handleRemove={(value) => {
                          const updatedExperience = experience.filter(
                            (result) => result.id != value.id
                          );
                          setExperience(updatedExperience);
                        }}
                        handleChange={(obj) => {
                          let expdate = [...experience];

                          let index = expdate.findIndex((item) => {
                            return item.id == obj.id;
                          });
                          expdate[index] = obj;
                          setExperience(expdate);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const expItem = {
                    id: `expList--${experience.length}`,
                    value: "",
                  };
                  const newExps = [...experience, expItem];
                  const emptyValue = experience.filter(
                    (item) => item.name == ""
                  );
                  if (emptyValue.length) {
                    return;
                  } else {
                    setExperience(newExps);
                  }
                }}
                type="button"
                className="goals-form--button--2_zb1 btn btn-tertiary"
              >
                <span className="mr5 cfi cfi-add" /> Add an answer
              </button>
            </div>
          </form>
        </div>{" "}
      </div>
    </div>
  );
};

export default Target;
