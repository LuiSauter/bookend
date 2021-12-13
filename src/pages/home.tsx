import React from 'react'

const Home = (): JSX.Element => {
  return (
    <>
      <article className="w-full bg-secondary flex flex-row p-4 relative gap-4">
        <figure className="m-0">
          <img src="/default-user.webp" width={200} alt="" />
        </figure>
        <div>
          <h2>Sauter</h2>
          <span className="text-textGray text-sm">few minutes ago</span>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
            aperiam tenetur nemo enim voluptatem odio voluptate? Voluptatibus id
            adipisci facilis. Facilis, iste! Tempore optio quisquam, voluptas
            ullam sint nostrum adipisci!
          </p>
          <span>bu as xd 1213k</span>
        </div>
      </article>
    </>
  )
}
export default Home