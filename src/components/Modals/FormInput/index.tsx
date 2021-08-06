

export const FormInput = () => {

    return (
        <div className="cf-form-input cf-form-element cf-form-element--default">
            <input
                name="email"
                type="email"
                className="cf-form-element__element"
                id="sign-in-email"
                data-ba="email-input"
                defaultValue=''
            />
        </div>
    );
}