import React from 'react'

import Input from '~/shared/components/Input'
import Button from '~/shared/components/Button';

function FiltersContainer() {
  return (
    <>
      <div className="filters-container">
        <div className="filters-action-box">
          <Input
            placeholder="Search"
            inputFieldClassName="search-box"
          />
          <FiltersButtonsBox
            buttons={[
              {
                onClick: () => {},
                label: 'Add Individuals',
                theme: 'quaternary',
              },
              {
                onClick: () => {},
                label: 'Upload CSV',
                theme: 'quaternary',
              },
            ]}
          />
        </div>

        <FiltersBox
        />
      </div>

      <style jsx>{`
        .filters-container {
          height: 70px;
          border-bottom: 2px solid var(--light-gray);
          padding-right: 25.5px;
          padding-left: 25.5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .filters-action-box {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}

function FiltersButtonsBox({
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
      <div className="filters-btn-box">
        {renderButtons}
      </div>
      <style jsx>{`
        .filters-btn-box {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  )
}

function FiltersBox({
  options
}) {
  return (
    <>
      <div className="filters-box">
        <div style={{width: 175, fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: 12}}>
          Name
        </div>
        <div style={{width: 212, fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: 12}}>
          Email
        </div>
        <div style={{width: 120, fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: 12}}>
          Status
        </div>
        <div style={{width: 170, fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: 12}}>
          City, State
        </div>
        <div style={{fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: 12}}>
          Level
        </div>
      </div>
      <style jsx>{`
        .filters-box {
          display: flex;
        }
      `}</style>
    </>
  )
}

export default FiltersContainer;