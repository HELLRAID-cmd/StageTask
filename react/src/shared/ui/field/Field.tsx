// import { PropsField } from "../../context/props";

// function Field({
//   className,
//   id,
//   label,
//   type,
//   value,
//   onInput,
//   ref,
//   error,
// }: PropsField) {
//   return (
//     <div className={`field ${className ?? ""}`}>
//       <label className="field__label" htmlFor={id}>
//         {label}
//       </label>
//       <input
//         className={`field__input ${error ? "is-invalid" : ""}`}
//         id={id}
//         placeholder=""
//         autoComplete="off"
//         type={type}
//         onChange={(e) => onInput?.(e.target.value)}
//         value={value ?? ""}
//         ref={ref}
//       />
//       {error && (
//         <span className="field__error" title={error}>
//           {error}
//         </span>
//       )}
//     </div>
//   );
// }

// export default Field;
