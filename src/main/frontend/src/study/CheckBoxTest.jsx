import React from 'react'

const CheckBoxTest = () => {
  return (
    <div>
      <table border='1px soild black'>
        <thead>
          <tr>
            <td>
              <input type="checkbox"/>
            </td>
            <td>과일</td>
            <td>가격</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" value='apple'/>
            </td>
            <td>Apple</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" value='banana'/>
            </td>
            <td>Banana</td>
            <td>2,000</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" value='orange'/>
            </td>
            <td>Orange</td>
            <td>3,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CheckBoxTest