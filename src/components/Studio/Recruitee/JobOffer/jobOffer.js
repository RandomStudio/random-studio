import styles from "./jobOffer.module.scss"
import React, { useState } from "react"

const JobOffer = ({
  closeOpenOffer,
  offer: { id, title, description, requirements, open_questions },
}) => {
  console.log(id)

  const [isSubmitForm, setIsSubmitForm] = useState(false)

  const handleFormSwitch = () => {
    setIsSubmitForm(prevState => !prevState)
  }

  const handleForm = () => {
    // fetch(
    //   `https://career.recruitee.com/api/c/23038/offers/${id}/candidates?widget=true&async=true`,
    //   {
    //     method: "POST",
    //     // body:
    //   }
    // )
  }

  console.log(open_questions)

  return (
    <section className={styles.jobOffer}>
      {!isSubmitForm ? (
        <div>
          <header>
            <button className={styles.closeButton} onClick={closeOpenOffer}>
              &times;
            </button>
            <strong>{title}</strong>
          </header>

          <div dangerouslySetInnerHTML={{ __html: description }}></div>
          <div dangerouslySetInnerHTML={{ __html: requirements }}></div>
          <button className={styles.applyButton} onClick={handleFormSwitch}>
            Apply for this position
          </button>
        </div>
      ) : (
        <div className={styles.applyForm}>
          <header>
            <button className={styles.closeButton} onClick={closeOpenOffer}>
              &times;
            </button>
            <strong>{title}</strong>
          </header>
          <form method="POST" name="applyForm">
            <div>
              <label htmlFor="candidate-name">
                <span>
                  Full name <abbr>*</abbr>
                </span>
                <input
                  id="candidate-name"
                  type="text"
                  name="candidate[name]"
                  required
                  maxLength="255"
                />
              </label>
              <label htmlFor="candidate-email">
                <span>
                  Email address <abbr>*</abbr>
                </span>
                <input
                  id="candidate-email"
                  type="email"
                  name="candidate[email]"
                  required
                  maxLength="255"
                />
              </label>
              <label htmlFor="candidate-phone">
                <span>
                  Phone number <abbr>*</abbr>
                </span>
                <input
                  id="candidate-phone"
                  type="tel"
                  name="candidate[phone]"
                  required
                  maxLength="255"
                />
              </label>
              <label htmlFor="candidate-cover-letter">
                <span>Cover letter</span>
                <textarea
                  id="candidate-cover-letter"
                  name="candidate[cover_letter]"
                />
              </label>
              <label htmlFor="candidate-cv">
                <span>
                  CV / Resume <abbr>*</abbr>
                </span>
                <input
                  id="candidate-cv"
                  type="file"
                  name="candidate[cv]"
                  required
                />
              </label>
              {open_questions[0] && (
                <label htmlFor="candidate[open_question_answers_attributes][0][content]">
                  <span>
                    Portfolio link <abbr>*</abbr>
                  </span>
                  <input
                    aria-required="true"
                    name="candidate[open_question_answers_attributes][0][content]"
                    type="text"
                    required="required"
                  />
                  <input
                    name="candidate[open_question_answers_attributes][0][open_question_id]"
                    type="hidden"
                    value={open_questions[0].id}
                  />
                </label>
              )}
            </div>

            <input
              className={styles.applyButton}
              type="submit"
              value="Apply for this position"
            ></input>
          </form>
        </div>
      )}
    </section>
  )
}

export default JobOffer
