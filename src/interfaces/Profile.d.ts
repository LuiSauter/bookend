interface Profile {
  description?: string;
  followers?: string[];
  following?: string[];
  gender?: string;
  id?: string;
  liked?: string[];
  location?: string;
  verified?: boolean;
  website?: string;
  me: {
    name?: string;
    photo?: string;
    user?: string | undefined;
    username?: string;
    verified?: boolean;
    email: string;
  };
  message?: string;
}