import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import useQuery from 'src/hooks/useQuery'

function SidebarLeft(props) {
  const { PostsList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList
  }))
  const { id } = useQuery()

  return (
    <div>
      <ul>
        {PostsList &&
          PostsList.map((cate, index) => (
            <li key={index}>
              <NavLink to="/">{cate.name}</NavLink>
              <ul>
                {cate.Items &&
                  cate.Items.map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? 'text-danger' : ''
                        }
                        to={`${cate.slug}/${item.slug}.html${
                          id ? '?id=' + id : ''
                        }`}
                      >
                        {item.title.rendered}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SidebarLeft
