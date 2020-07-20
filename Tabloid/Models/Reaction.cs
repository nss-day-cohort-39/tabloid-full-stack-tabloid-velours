using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Reaction
    {
        public int Id { get; set; }
        public int EmojiId { get; set; }
        public Emoji Emoji { get; set; }
        //public List<PostReaction> PostReactionList { get; set; }
        //public List<Emoji> Emojis { get; set; }

    }
}
