import { useEffect, useState } from "react";
import { useAlert } from "react-alert";


import { Included } from "./Includeded";
import { CreateIncluded } from "./CreateIncluded";
import { Syllabus } from "./Syllabus";
import { SyllabusCreate } from "./SyllabusCreate";
import { CreateOutcome } from "./CreateOutcome";

import { Outcome } from "./Outcome";

import { selectSave } from "state/course/courseSplice";

import {
  selectLocationPayload,
  selectLocationType,
} from "state/location/selectors";
import { useAppSelector } from "store/hooks";

import {
  useCreateHeadingMutation,
  useCreateIncludedMutation,
  useCreateLearningOutcomeMutation,
  useCreateSyllabusMutation,
  useEditSyllabusMutation,
  useEditIncludedMutation,
  useDeleteOutcomeMutation,
  useEditLearningOutcomeMutation,
  useFetchIncludedQuery,
  useDeleteSyllabusMutation,
  useDeleteIncludedMutation,
  useFetchSyllabusQuery,
  useFetchOutcomesQuery,
} from "services/projects";

import {
  selectOutcomes,
  selectIncluded,
  selectSyllabuses,
} from "state/project/projectSplice";

export const Target = () => {
  const locationPath = useAppSelector(selectLocationType);
  const selectedSave = useAppSelector(selectSave);
  const locationPayload = useAppSelector(selectLocationPayload);

  const selectedOutcomes = useAppSelector(selectOutcomes);
  const selectedIncluded = useAppSelector(selectIncluded);
  const selectedSyllabuses = useAppSelector(selectSyllabuses);
  const [createSyllabus] = useCreateSyllabusMutation();
  const [createLearningOutcome] = useCreateLearningOutcomeMutation();
  const [createIncluded] = useCreateIncludedMutation();
  const [editSyllabus] = useEditSyllabusMutation();
  const [editLearningOutcome] = useEditLearningOutcomeMutation();
  const [editIncluded] = useEditIncludedMutation();
  const [deleteSyllabus] = useDeleteSyllabusMutation();
  const [deleteOutcome] = useDeleteOutcomeMutation();
  const [deleteIncluded] = useDeleteIncludedMutation();

  const { data: syllabusQuery } = useFetchSyllabusQuery(locationPayload.id);
  const { data: learningQuery } = useFetchOutcomesQuery(locationPayload.id);
  const { data: IncludedQuery } = useFetchIncludedQuery(locationPayload.id);

  const [syllabusUpdate, setSyllabusUpdate] = useState(selectedSyllabuses);
  const [learningUpdate, setLearningUpdate] = useState(selectedOutcomes);
  const [includeUpdate, setIncludeUpdate] = useState(selectedIncluded);

  const alert = useAlert();

  const [syllabuses, setSyllabuses] = useState([
    { id: "syllabusList--0", title: "" },
  ]);
  const [outcomes, setOutcomes] = useState([
    { id: "outcomeList--0", title: "" },
  ]);

  const [included, setIncluded] = useState([{ id: "incList--0", title: "" }]);

  const removeSyllabus = (syllabus) => {
    deleteSyllabus(syllabus.id);
  };

  const removeOutcome = (req) => {
    deleteOutcome(req.id);
  };

  const removeIncluded = (req) => {
    deleteIncluded(req.id);
  };

  useEffect(() => {
    setLearningUpdate(selectedOutcomes);
  }, [selectedOutcomes]);

  useEffect(() => {
    setIncludeUpdate(selectedIncluded);
  }, [selectedIncluded]);

  useEffect(() => {
    setSyllabusUpdate(selectedSyllabuses);
  }, [selectedSyllabuses]);

  useEffect(() => {
    const syllabusResults = syllabuses;
    syllabusResults &&
      syllabusResults.forEach((syllabus) => {
        if (syllabus.title) {
          createSyllabus({
            title: syllabus.title,
            project: locationPayload.id,
          }).then(() => {
            const results = syllabusResults.filter(
              (item) => item.id != syllabus.id
            );
            setSyllabuses(results);
            alert.show("Your data has been saved successfully");
          });
        }
      });

    const learningOutcomes = outcomes;
    learningOutcomes &&
      learningOutcomes.forEach((exp) => {
        if (exp.title) {
          createLearningOutcome({
            title: exp.title,
            project: locationPayload.id,
          }).then(() => {
            const results = learningOutcomes.filter(
              (item) => item.id != exp.id
            );
            setOutcomes(results);
            alert.show("Your data has been saved successfully");
          });
        }
      });

    const incResults = included;
    incResults &&
      incResults.forEach((req) => {
        if (req.title) {
          createIncluded({
            title: req.title,
            project: locationPayload.id,
          }).then(() => {
            const results = incResults.filter((item) => item.id != req.id);
            setIncluded(results);
            alert.show("Your data has been saved successfully");
          });
        }
      });
    syllabusUpdate &&
      syllabusUpdate.forEach((req) => {
        if (req.title) {
          console.log("Req: ", req);
          editSyllabus({
            ...req,
            project: locationPayload.id,
          }).then(() => {
            alert.show("Your data has been saved successfully");
          });
        }
      });

    learningUpdate &&
      learningUpdate.forEach((req, index) => {
        if (req.title) {
          editLearningOutcome({
            ...req,
            project: locationPayload.id,
          }).then(() => {
            alert.show("Your data has been saved successfully");
          });
        }
      });

    includeUpdate &&
      includeUpdate.forEach((item) => {
        if (item.title) {
          editIncluded({
            ...item,
            project: locationPayload.id,
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
            project is the one for them.
          </div>
          <form>
            <div>
              <div className="form-group">
                <label htmlFor="learn-goal" className="control-label">
                  What will students learn in your project?
                </label>
                <div>
                  <div>
                    {syllabusUpdate &&
                      syllabusUpdate.map((syllabus) => (
                        <Syllabus
                          key={syllabus.id}
                          syllabus={syllabus}
                          handleRemove={removeSyllabus}
                          handleChange={(obj) => {
                            let gUpdate = [...syllabusUpdate];
                            let index = gUpdate.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            gUpdate[index] = obj;
                            setSyllabusUpdate(gUpdate);
                          }}
                        />
                      ))}
                    {syllabuses.map((syllabus) => (
                      <SyllabusCreate
                        key={syllabus.id}
                        syllabus={syllabus}
                        handleRemove={(value) => {
                          const updatedGoals = syllabus.filter(
                            (result) => result.id != value.id
                          );
                          setSyllabuses(updatedGoals);
                        }}
                        handleChange={(obj) => {
                          let newSyllabus = [...syllabuses];
                          let index = newSyllabus.findIndex((item) => {
                            return item.id == obj.id;
                          });
                          newSyllabus[index] = obj;
                          setSyllabuses(newSyllabus);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const syllabusItem = {
                    id: `syllabusList--${syllabuses.length}`,
                    title: "",
                  };
                  const newSyllabus = [...syllabuses, syllabusItem];
                  const emptyValue = syllabuses.filter(
                    (item) => item.title == ""
                  );
                  if (emptyValue.length) {
                    return;
                  } else {
                    setSyllabuses(newSyllabus);
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
                  What will be the important takeaways?
                </label>
                <div>
                  <div>
                    {learningUpdate &&
                      learningUpdate.map((req) => (
                        <Outcome
                          outcome={req}
                          key={req.id}
                          handleRemove={removeOutcome}
                          handleChange={(obj) => {
                            let reqUpdates = [...learningUpdate];
                            let index = reqUpdates.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            reqUpdates[index] = obj;
                            setLearningUpdate(reqUpdates);
                          }}
                        />
                      ))}

                    {outcomes.map((req) => (
                      <CreateOutcome
                        outcome={req}
                        key={req.id}
                        handleRemove={(value) => {
                          const updatedReqs = outcomes.filter(
                            (result) => result.id != value.id
                          );
                          setOutcomes(updatedReqs);
                        }}
                        handleChange={(obj) => {
                          let reqs = [...outcomes];
                          let index = reqs.findIndex((item) => {
                            return item.id == obj.id;
                          });
                          reqs[index] = obj;
                          setOutcomes(reqs);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const reqItem = {
                    id: `outcomeList--${outcomes.length}`,
                    value: "",
                  };
                  const newReqs = [...outcomes, reqItem];
                  const emptyValue = outcomes.filter((item) => item.name == "");
                  if (emptyValue.length) {
                    return;
                  } else {
                    setOutcomes(newReqs);
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
                  Let your students know what is included in this project?
                </label>
                <div>
                  <div>
                    {includeUpdate &&
                      includeUpdate.map((exp) => (
                        <Included
                          key={exp.id}
                          inc={exp}
                          handleRemove={removeIncluded}
                          handleChange={(obj) => {
                            let expUpdate = [...includeUpdate];

                            let index = expUpdate.findIndex((item) => {
                              return item.id == obj.id;
                            });
                            expUpdate[index] = obj;
                            setIncludeUpdate(expUpdate);
                          }}
                        />
                      ))}

                    {included.map((exp) => (
                      <CreateIncluded
                        key={exp.id}
                        inc={exp}
                        handleRemove={(value) => {
                          const updatedIncluded = included.filter(
                            (result) => result.id != value.id
                          );
                          setIncluded(updatedIncluded);
                        }}
                        handleChange={(obj) => {
                          let expdate = [...included];

                          let index = expdate.findIndex((item) => {
                            return item.id == obj.id;
                          });
                          expdate[index] = obj;
                          setIncluded(expdate);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const expItem = {
                    id: `incList--${included.length}`,
                    value: "",
                  };
                  const newExps = [...included, expItem];
                  const emptyValue = included.filter(
                    (item) => item.title == ""
                  );
                  if (emptyValue.length) {
                    return;
                  } else {
                    setIncluded(newExps);
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
