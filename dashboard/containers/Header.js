import React from 'react'

import Input from '~/shared/components/Input'
import Button from '~/shared/components/Button';
import TriangleDownIcon from '~/shared/components/icons/TriangleDownIcon';

function Header() {
  return (
    <>
      <div className="container">
        <div className="action-box">
          <Input
            placeholder="Search"
            inputFieldClassName="search-box"
          />
          <ButtonsBox
            buttons={[
              {
                onClick: () => {},
                label: 'Add Individuals',
                theme: 'quaternary',
              },
              // {
              //   onClick: () => {},
              //   label: 'Upload CSV',
              //   theme: 'quaternary',
              // },
            ]}
          />
        </div>

        <TableHeaders
          fields={[
            {
              name: 'Name',
              sortAction: () => {},
              style: {
                width: 175
              }
            },
            {
              name: 'Email',
              style: {
                width: 212
              }
            },
            {
              name: 'Status',
              sortAction: () => {},
              style: {
                width: 120
              }
            },
            {
              name: 'City, State',
              sortAction: () => {},
              style: {
                width: 170
              }
            },
            {
              name: 'Level',
              sortAction: () => {},
            },
          ]}
        />
      </div>

      <style jsx>{`
        .container {
          height: 70px;
          border-bottom: 2px solid var(--light-gray);
          padding-right: 25.5px;
          padding-left: 25.5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .action-box {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}

function ButtonsBox({
  buttons
}) {
  const renderButtons = buttons.map((button, index) => <Button
    key={index}
    theme={button.theme}
    label={button.label}
    onClick={button.onClick}
  />)

  return (
    <>
      <div className="btn-box">
        {renderButtons}
      </div>
      <style jsx>{`
        .btn-box {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  )
}

function TableHeaders({
  fields
}) {
  const renderFields = fields.map((field, index) => <div
    key={index}
    className="field"
    style={field.style && field.style}
  >
    {field.name}
    {field.sortAction && <div className="icon-wrapper">
      <TriangleDownIcon onClick={field.sortAction} />
    </div>}
    <style jsx>{`
      .field {
        font-family: var(--font-family-sans-serif);
        font-size: 12px;
        font-weight: 400;
        color: var(--dark);
        display: flex;
        align-items: flex-start;
      }

      .icon-wrapper {
        margin-left: 8.5px;
      }
    `}</style>
  </div>)

  return (
    <>
      <div className="fields-container">
        {renderFields}
      </div>
      <style jsx>{`
        .fields-container {
          display: flex;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  )
}

export default Header;