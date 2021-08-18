import { Goal } from "services/courses";
import { MarkIcon } from "../Icons";
type GoalProps = {
    goals: Goal[]
}
export const Goals: React.FC<GoalProps> = ({ goals }) => {
    return (
        <div className="what-you-will-learn--what-will-you-learn--mnJ5T">
            <h2 className="udlite-heading-xl what-you-will-learn--title--hropy">
                What you'll learn
            </h2>
            <div className="what-you-will-learn--content-spacing--3btHJ">
                <ul className="unstyled-list udlite-block-list what-you-will-learn--objectives-list--2cWZN">
                    {goals?.map(goal => (
                        <li key={goal.id}>
                            <div
                                data-purpose="objective"
                                className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm"
                            >
                                <MarkIcon />
                                <div className="udlite-block-list-item-content">
                                    <span className="what-you-will-learn--objective-item--ECarc">
                                        {goal.name}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}