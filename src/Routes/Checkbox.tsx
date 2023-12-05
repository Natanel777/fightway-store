import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  termsLink: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label }) => {
    const termsLink = 'https://www.dropbox.com/scl/fi/invnie92nz297jbsxctnw/htmlCode.pdf?rlkey=eeq6d0712yn4fyrsefjhl88wo&raw=1';

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          aria-describedby={id}
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
          required
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-light text-gray-500 dark:text-gray-300">
          I Accept the{' '}
          <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href={termsLink}>
            Terms and Conditions
          </a>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;