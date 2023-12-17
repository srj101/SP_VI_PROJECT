import { createError } from "../utils/error.js";
import prisma from "../prisma/prisma.js";
// route to get all Professions
export const getProfessions = async (req, res, next) => {
  const { page, limit, searchQuery } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  try {
    if (searchQuery) {
      const professions = await prisma.profession.findMany({
        skip: parseInt(offset),
        take: parseInt(perPage),
        where: {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      });
      return res.status(200).json({ professions });
    }

    const professions = await prisma.profession.findMany({
      skip: parseInt(offset),
      take: parseInt(perPage),
    });

    return res.status(200).json({ professions });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error: error.message });
  }
};

// route to find professions interest by user id
export const findProfessionsInterestByUserID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const interest = await prisma.professionUsers.findMany({
      where: {
        userId: parseInt(id),
      },
      include: {
        profession: true,
      },
    });
    return res.status(200).json({ interest });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// route to create a profession
export const createProfession = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please enter name fields" });
  }
  try {
    const profession = await prisma.profession.create({
      data: {
        name,
      },
    });
    return res.status(200).json({ profession });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
// route to get a profession by id
export const getProfessionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profession = await prisma.profession.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ profession });
  } catch (error) {
    return res.status(400).json("professions Doesn't Found");
  }
};
// route to update a profession
export const updateProfession = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Please enter name fields" });
  }

  try {
    const profession = await prisma.profession.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    return res.status(200).json({ profession });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// route to delete a profession
export const deleteProfession = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profession = await prisma.profession.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({ profession });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// route to get all professions users
export const ProfessionsUser = async (req, res, next) => {
  const { id } = req.params;

  let { page, limit, gender, location, ageGt, ageLt, professionUserSearch } = req.query;
  if (ageGt === '' || ageLt === '' || ageGt < 0 || ageLt < 0) {
    ageGt = parseInt(0);
    ageLt = parseInt(200);
  }
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  try {
    if (professionUserSearch) {
      const professions = await prisma.professionUsers.findMany({
        where: {
          professionId: parseInt(id),
          user: {
            OR: [
              {
                firstName: {
                  contains: professionUserSearch,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: professionUserSearch,
                  mode: "insensitive",
                },
              },
              {
                fullName: {
                  contains: professionUserSearch,
                  mode: "insensitive",
                }
              }
            ],
          },
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
              age: true,

            }
          },
        },
        skip: parseInt(offset),
        take: parseInt(perPage),
      }
      )
      return res.status(200).json({ professions });
    }



    if (gender !== '' && location === '') {
      const professions = await prisma.professionUsers.findMany({
        where: {
          professionId: parseInt(id),
          user: {
            gender: {
              equals: gender
            },
            age: {
              gte: parseInt(ageGt),
              lte: parseInt(ageLt),
            }
          }
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
              age: true,

            }
          },
        },
        skip: parseInt(offset),
        take: parseInt(perPage),
      });
      return res.status(200).json({ professions });
    }
    else if (gender === '' && location !== '') {
      const professions = await prisma.professionUsers.findMany({
        where: {
          professionId: parseInt(id),
          user: {
            location: {
              contains: location,
              mode: "insensitive",
            },
            age: {
              gte: parseInt(ageGt),
              lte: parseInt(ageLt),
            }
          }

        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
              age: true,

            }
          },
        },
        skip: parseInt(offset),
        take: parseInt(perPage),
      });
      return res.status(200).json({ professions });
    }

    else if (gender !== '' && location !== '') {
      const professions = await prisma.professionUsers.findMany({
        where: {
          professionId: parseInt(id),
          user: {
            gender: {
              equals: gender
            },
            location: {
              contains: location,
              mode: "insensitive",
            },
            age: {
              gte: parseInt(ageGt),
              lte: parseInt(ageLt),
            }
          }
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
              age: true,

            }
          },
        },
        skip: parseInt(offset),
        take: parseInt(perPage),
      });
      return res.status(200).json({ professions });
    }
    else if (gender === '' && location === '') {
      const professions = await prisma.professionUsers.findMany({
        where: {
          professionId: parseInt(id),
          user: {
            age: {
              gte: parseInt(ageGt),
              lte: parseInt(ageLt),
            }
          }
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
              age: true,

            }
          },
        },
        skip: parseInt(offset),
        take: parseInt(perPage),
      });
      console.log(offset, perPage)
      return res.status(200).json({ professions });
    }


  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// route to follow profession
export const ProfessionsFollow = async (req, res, next) => {
  const { professionId } = req.body;
  const { id: userId } = req.user;

  try {
    const isExits = await prisma.professionUsers.findFirst({
      where: {
        professionId: parseInt(professionId),
        userId: parseInt(userId),
      },
    });
    if (isExits) {
      return res.status(400).json({ message: "Already Followed" });
    }
    const profession = await prisma.professionUsers.create({
      data: {
        professionId: parseInt(professionId),
        userId: parseInt(userId),
      },
    });
    return res.status(200).json({ profession });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// route to check if user is following a profession
export const isFollowing = async (req, res, next) => {
  const { professionId } = req.query;
  const { id: userId } = req.user;
  try {
    const isExits = await prisma.professionUsers.findFirst({
      where: {
        professionId: parseInt(professionId),
        userId: parseInt(userId),
      },
    });
    if (isExits) {
      return res.status(200).json({ isFollowing: true });
    } else {
      return res.status(200).json({ isFollowing: false });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// route to unfollow profession

export const UnFollowProfession = async (req, res, next) => {
  const { professionId } = req.params;
  const { id: userId } = req.user;
  try {
    const isExits = await prisma.professionUsers.findFirst({
      where: {
        professionId: parseInt(professionId),
        userId: parseInt(userId),
      },
    });
    if (!isExits) {
      return res.status(400).json({ message: "Already UnFollowed" });
    }
    const profession = await prisma.professionUsers.delete({
      where: {
        id: parseInt(isExits.id),
      },
    });
    return res.status(200).json({ profession });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
