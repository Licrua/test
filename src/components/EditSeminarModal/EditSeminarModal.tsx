import { useEffect, useState } from "react";
import { ISeminar } from "../SeminarsList/SeminarsList";
import { convertDateFormat } from "../../helpers/convertDateFormat";

interface EditSeminarModalProps {
  seminar: ISeminar;
  onEditSave: (updatedSeminar: ISeminar) => void;
  isEditing: boolean;
}

export default function EditSeminarModal({
  seminar,
  onEditSave,
  isEditing,
}: EditSeminarModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (seminar) {
      setFormData({
        title: seminar.title,
        description: seminar.description,
        date: convertDateFormat(seminar.date, true),
        time: seminar.time,
      });
    }
  }, [seminar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (seminar) {
      const updatedSeminar: ISeminar = {
        ...seminar,
        ...formData,
        date: convertDateFormat(formData.date, false),
      };
      onEditSave(updatedSeminar);
    }
  };

  return (
    <dialog id="edit_seminar_modal" className="modal">
      <div className="modal-box">
        <fieldset className="fieldset w-ful">
          <legend className="fieldset-legend text-xl">
            Редактирование семинара
          </legend>

          <label className="fieldset-label text-base">Заголовок</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            className="input"
            placeholder="Заголовок"
          />

          <label className="fieldset-label text-base">Описание</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea"
            placeholder="Описание"
          />

          <label className="fieldset-label text-base">Дата</label>
          <input
            name="date"
            value={convertDateFormat(formData.date, true)}
            onChange={handleChange}
            type="date"
            className="input"
          />

          <label className="fieldset-label text-base">Время</label>
          <input
            name="time"
            value={formData.time}
            onChange={handleChange}
            type="time"
            className="input"
          />
        </fieldset>
        <div className="modal-action">
          <button className="btn btn-success" onClick={handleSave}>
            {isEditing ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Сохранить"
            )}
          </button>
          <form method="dialog">
            <button className="btn btn-error">Отмена</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
