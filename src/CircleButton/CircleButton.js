import React from 'react'


export default function CircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['CircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

CircleButton.defaultProps ={
  tag: 'a',
}