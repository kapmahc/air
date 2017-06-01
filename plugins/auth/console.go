package auth

import (
	"fmt"

	"github.com/facebookgo/inject"
	"github.com/kapmahc/air/web"
	"github.com/urfave/cli"
)

// Console console commands
func (p *Plugin) Console() []cli.Command {
	return []cli.Command{
		{
			Name:    "users",
			Aliases: []string{"us"},
			Usage:   "users operations",
			Subcommands: []cli.Command{
				{
					Name:    "list",
					Aliases: []string{"l"},
					Usage:   "list users",
					Action: web.Inject(func(*cli.Context, *inject.Graph) error {
						var users []User
						if err := p.Db.
							Select([]string{"name", "email", "uid"}).
							Find(&users).Error; err != nil {
							return err
						}
						fmt.Printf("UID\t\t\t\t\tFULL-NAME<EMAIL>\n")
						for _, u := range users {
							fmt.Printf("%s\t%s<%s>\n", u.UID, u.Name, u.Email)
						}
						return nil
					}),
				},
				{
					Name:    "role",
					Aliases: []string{"r"},
					Usage:   "apply/deny role to user",
					Flags: []cli.Flag{
						cli.StringFlag{
							Name:  "name, n",
							Value: "",
							Usage: "role's name",
						},
						cli.StringFlag{
							Name:  "user, u",
							Value: "",
							Usage: "user's uid",
						},
						cli.IntFlag{
							Name:  "years, y",
							Value: 10,
							Usage: "years",
						},
						cli.BoolFlag{
							Name:  "deny, d",
							Usage: "deny mode",
						},
					},
					Action: web.Inject(func(c *cli.Context, _ *inject.Graph) error {
						uid := c.String("user")
						name := c.String("name")
						deny := c.Bool("deny")
						years := c.Int("years")
						if uid == "" || name == "" {
							cli.ShowSubcommandHelp(c)
							return nil
						}

						user, err := p.Dao.GetUserByUID(uid)
						if err != nil {
							return err
						}

						role, err := p.Dao.Role(name, DefaultResourceType, DefaultResourceID)
						if err != nil {
							return err
						}
						if deny {
							return p.Dao.Deny(role.ID, user.ID)
						}
						return p.Dao.Allow(role.ID, user.ID, years, 0, 0)
					}),
				},
			},
		},
	}
}
