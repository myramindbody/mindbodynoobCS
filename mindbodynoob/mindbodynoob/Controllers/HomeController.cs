using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using mindbodynoob.Models;

namespace mindbodynoob.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("MBNoob");
        }

        public JsonResult LogIn(String email, String password)
        {
            System.Diagnostics.Debug.WriteLine("LOG IN -- Email: " + email + " Pass: " + password);
            User newUser = new User(email, password);

            //System.Diagnostics.Debug.WriteLine(newUser.GetEmail() + " " + newUser.GetPassword() + " " + newUser.GetCBoxState(0));
            //newUser.SetCBoxState(0, true);
            //System.Diagnostics.Debug.WriteLine(newUser.GetCBoxState(0));

            //do some sort of check to see if user exists, return object or null
            return new JsonResult{Data = newUser};
        }

        public JsonResult CreateNewUser(String email, String password)
        {
            System.Diagnostics.Debug.WriteLine("CREATE NEW USER -- Email: " + email + " Pass: " + password);
            User newUser = new User(email, password);
            //put user in database! then log user in
            return LogIn(email, password);
        }

        public ActionResult LogOut()
        {
            System.Diagnostics.Debug.WriteLine("Logged out");
            //return JSON shizzz
            //database stuff
            //return object
            return null;
        }
    }
}
