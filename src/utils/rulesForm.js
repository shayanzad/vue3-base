export const rulseForm = () => {
  const required = (value) => !!value || 'مقدار اجباری است'
  const reqArray = (value) => value.length > 0 || 'مقدار اجباری است'
  const maxLength = (value) => value.length <= 100 || 'بیشتر از 100 کاراکتر نمی توانید وارد کنید.'
  const minLength = (value) => value.length >= 8 || 'باید حداقل 8 کاراکتر وارد کنید.'
  const email = (value) => /.+@.+\..+/.test(value) || 'ایمیل وارد شده معتبر نمی باشد.'
  const numeric = (value) => /^\d+$/.test(value) || 'فقط عدد می توانید وارد کنید.'
  const mobile = (value) => /^(09)[0-9]{9}$/.test(value) || 'شماره موبایل وارد شده معتبر نمی باشد.'
  const mobileLength = (value) => value.length === 11 || 'شماره موبایل باید 11 رقم باشد.'
  const persianWord = (value) =>
    /^[\u0600-\u06FF\s]+$/.test(value) || 'فقط حروف فارسی می توانید وارد کنید.'
  const onlyEnglish = (value) =>
    /^[a-zA-Z0-9]+$/.test(value) || 'فقط حروف انگلیسی و اعداد می توانید وارد کنید.'
  const smartIdLength = (value) => value.length >= 7 || 'باید 7 کاراکتر وارد کنید.'
  const bankAccountCard = (value) => value.length === 19 || 'شماره کارت باید 16 رقم باشد.'
  const passwordWordAndNumber = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
    'کلمه عبور باید حداقل شامل یک حرف بزرگ و یک حرف کوچک و یک عدد و یک کاراکتر خاص باشد.'
  const matchPassword = (value, password) =>
    value === password || 'کلمه عبور و تکرار کلمه عبور باید یکسان باشد.'
  return {
    matchPassword,
    required,
    reqArray,
    passwordWordAndNumber,
    bankAccountCard,
    onlyEnglish,
    maxLength,
    smartIdLength,
    minLength,
    email,
    numeric,
    mobile,
    mobileLength,
    persianWord,
  }
}
