import { mdiOpenInNew } from "@mdi/js";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { fireEvent } from "../../common/dom/fire_event";
import type { LocalizeFunc } from "../../common/translations/localize";
import { createCloseHeading } from "../../components/ha-dialog";
import "../../components/ha-list";
import "../../components/ha-list-item";

@customElement("community-dialog")
class DialogCommunity extends LitElement {
  @property({ attribute: false }) public localize?: LocalizeFunc;

  public async showDialog(params): Promise<void> {
    this.localize = params.localize;
  }

  public async closeDialog(): Promise<void> {
    this.localize = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render() {
    if (!this.localize) {
      return nothing;
    }
    return html`<ha-dialog
      open
      hideActions
      @closed=${this.closeDialog}
      .heading=${createCloseHeading(
        undefined,
        this.localize("ui.panel.page-onboarding.welcome.community")
      )}
    >
      <ha-list>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://community.home-assistant.io/"
        >
          <ha-list-item hasMeta graphic="icon">
            <img
              src="/static/icons/favicon-192x192.png"
              slot="graphic"
              alt="Home Assistant Logo"
            />
            ${this.localize("ui.panel.page-onboarding.welcome.forums")}
            <ha-svg-icon slot="meta" .path=${mdiOpenInNew}></ha-svg-icon>
          </ha-list-item>
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://newsletter.openhomefoundation.org/"
        >
          <ha-list-item hasMeta graphic="icon">
            <img
              src="/static/icons/logo_ohf.svg"
              slot="graphic"
              alt="Open Home Foundation Logo"
            />
            ${this.localize(
              "ui.panel.page-onboarding.welcome.open_home_newsletter"
            )}
            <ha-svg-icon slot="meta" .path=${mdiOpenInNew}></ha-svg-icon>
          </ha-list-item>
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.home-assistant.io/join-chat"
        >
          <ha-list-item hasMeta graphic="icon">
            <img
              src="/static/images/logo_discord.png"
              slot="graphic"
              alt="Discord Logo"
            />
            ${this.localize("ui.panel.page-onboarding.welcome.discord")}
            <ha-svg-icon slot="meta" .path=${mdiOpenInNew}></ha-svg-icon>
          </ha-list-item>
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://fosstodon.org/@homeassistant"
        >
          <ha-list-item hasMeta graphic="icon">
            <img
              src="/static/images/logo_mastodon.svg"
              slot="graphic"
              alt="Mastodon Logo"
            />
            ${this.localize("ui.panel.page-onboarding.welcome.mastodon")}
            <ha-svg-icon slot="meta" .path=${mdiOpenInNew}></ha-svg-icon>
          </ha-list-item>
        </a>
      </ha-list>
    </ha-dialog>`;
  }

  static styles = css`
    ha-dialog {
      --mdc-dialog-min-width: min(400px, 90vw);
      --dialog-content-padding: 0;
    }
    ha-list-item {
      height: 56px;
      --mdc-list-item-meta-size: 20px;
    }
    a {
      text-decoration: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "community-dialog": DialogCommunity;
  }
}
